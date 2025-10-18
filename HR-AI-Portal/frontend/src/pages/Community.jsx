import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Community.css';

const Community = () => {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentRoom, setCurrentRoom] = useState('general');
  const [rooms, setRooms] = useState(['general', 'announcements', 'networking']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    fetchMessages();
    fetchRooms();
  }, [currentRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/chat/messages/${currentRoom}?limit=50&page=1`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setMessages(response.data.data);
        setError('');
      }
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/api/chat/rooms', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success && response.data.data.length > 0) {
        setRooms(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch rooms:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    try {
      const response = await axios.post(
        '/api/chat/messages',
        {
          content: inputValue,
          room: currentRoom,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setMessages([...messages, response.data.data]);
        setInputValue('');
        setError('');
      }
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="community-page">
      <header className="community-header">
        <div className="header-content">
          <h1>💬 Community Chat</h1>
          <p>Connect with certified professionals</p>
        </div>
      </header>

      <div className="community-container">
        <aside className="community-sidebar">
          <div className="sidebar-section">
            <h3>Chat Rooms</h3>
            <div className="room-list">
              {rooms.map((room) => (
                <button
                  key={room}
                  onClick={() => {
                    setCurrentRoom(room);
                    setMessages([]);
                  }}
                  className={`room-btn ${currentRoom === room ? 'active' : ''}`}
                >
                  <span className="room-icon">#</span>
                  <span className="room-name">{room}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Status</h3>
            <div className="status-card">
              <div className="status-indicator online"></div>
              <span>{onlineUsers || 12} Online</span>
            </div>
          </div>
        </aside>

        <main className="chat-main">
          <div className="chat-header">
            <h2>#{currentRoom}</h2>
            <p className="room-description">
              {currentRoom === 'general' && 'General discussion and networking'}
              {currentRoom === 'announcements' && 'Important updates and announcements'}
              {currentRoom === 'networking' && 'Professional networking and connections'}
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="messages-container">
            {isLoading ? (
              <div className="loading-state">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="empty-state">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              <div className="messages-list">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${msg.userId === user?.id ? 'own' : 'other'}`}
                  >
                    <div className="message-avatar">
                      {msg.user.firstName.charAt(0).toUpperCase()}
                    </div>
                    <div className="message-content">
                      <div className="message-header">
                        <span className="message-author">
                          {msg.user.firstName} {msg.user.lastName}
                        </span>
                        <span className="message-time">
                          {formatTime(msg.createdAt)}
                        </span>
                      </div>
                      <div className="message-text">{msg.content}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form className="message-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="message-input"
              disabled={isLoading}
            />
            <button type="submit" className="send-btn" disabled={!inputValue.trim()}>
              Send
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Community;
