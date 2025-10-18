const request = require('supertest');
const app = require('../../app');
const { BlogPost, User } = require('../../models');

jest.mock('../../models');

describe('Blog Endpoints', () => {
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsInJvbGUiOiJ1c2VyIn0';
  const mockAuthHeader = { Authorization: `Bearer ${mockToken}` };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/blog', () => {
    it('should retrieve published blog posts', async () => {
      const mockPosts = [
        {
          id: '1',
          title: 'Learning React',
          slug: 'learning-react',
          category: 'Tutorial',
          isPublished: true,
          viewCount: 100,
        },
      ];

      BlogPost.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: mockPosts,
      });

      const response = await request(app)
        .get('/api/blog')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].isPublished).toBe(true);
    });

    it('should search blog posts by title', async () => {
      const mockPosts = [
        { id: '1', title: 'Learning React', slug: 'learning-react', isPublished: true },
      ];

      BlogPost.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: mockPosts,
      });

      const response = await request(app)
        .get('/api/blog?search=React')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data[0].title).toContain('React');
    });

    it('should filter blog posts by category', async () => {
      const mockPosts = [
        { id: '1', title: 'React Tutorial', category: 'Tutorial', isPublished: true },
      ];

      BlogPost.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: mockPosts,
      });

      const response = await request(app)
        .get('/api/blog?category=Tutorial')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data[0].category).toBe('Tutorial');
    });

    it('should handle empty search results', async () => {
      BlogPost.findAndCountAll.mockResolvedValue({
        count: 0,
        rows: [],
      });

      const response = await request(app)
        .get('/api/blog?search=nonexistent')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('POST /api/blog', () => {
    it('should create a new blog post', async () => {
      const postData = {
        title: 'Advanced React Patterns',
        content: 'This is a detailed post about React patterns...',
        category: 'Tutorial',
      };

      BlogPost.create.mockResolvedValue({
        id: '123',
        slug: 'advanced-react-patterns',
        ...postData,
      });

      const response = await request(app)
        .post('/api/blog')
        .set(mockAuthHeader)
        .send(postData);

      expect(response.status).toBe(201);
      expect(response.body.data.slug).toBeDefined();
      expect(response.body.data.title).toBe(postData.title);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/blog')
        .set(mockAuthHeader)
        .send({ title: 'No Content' });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('content');
    });

    it('should validate title length', async () => {
      const response = await request(app)
        .post('/api/blog')
        .set(mockAuthHeader)
        .send({
          title: 'A', // Too short
          content: 'Valid content',
          category: 'Tutorial',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('title');
    });

    it('should validate content length', async () => {
      const response = await request(app)
        .post('/api/blog')
        .set(mockAuthHeader)
        .send({
          title: 'Valid Title',
          content: 'Short', // Too short
          category: 'Tutorial',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('content');
    });

    it('should generate slug from title', async () => {
      const postData = {
        title: 'Advanced React Patterns Tutorial',
        content: 'This is a detailed post about React patterns and best practices...',
        category: 'Tutorial',
      };

      BlogPost.create.mockResolvedValue({
        id: '123',
        slug: 'advanced-react-patterns-tutorial',
        ...postData,
      });

      const response = await request(app)
        .post('/api/blog')
        .set(mockAuthHeader)
        .send(postData);

      expect(response.status).toBe(201);
      expect(response.body.data.slug).toContain('advanced-react-patterns-tutorial');
    });
  });

  describe('PUT /api/blog/:id', () => {
    it('should update an existing blog post', async () => {
      const postId = '123';
      const updateData = {
        title: 'Updated Blog Title',
        content: 'Updated content',
      };

      BlogPost.update.mockResolvedValue([1]);
      BlogPost.findByPk.mockResolvedValue({ id: postId, ...updateData });

      const response = await request(app)
        .put(`/api/blog/${postId}`)
        .set(mockAuthHeader)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe(updateData.title);
    });

    it('should return 404 for non-existent blog post update', async () => {
      const postId = 'nonexistent';
      const updateData = { title: 'Updated Title' };

      BlogPost.update.mockResolvedValue([0]);
      BlogPost.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .put(`/api/blog/${postId}`)
        .set(mockAuthHeader)
        .send(updateData);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/blog/:id', () => {
    it('should delete an existing blog post', async () => {
      const postId = '123';

      BlogPost.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete(`/api/blog/${postId}`)
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('deleted');
    });

    it('should return 404 for non-existent blog post deletion', async () => {
      const postId = 'nonexistent';

      BlogPost.destroy.mockResolvedValue(0);

      const response = await request(app)
        .delete(`/api/blog/${postId}`)
        .set(mockAuthHeader);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/blog/:id', () => {
    it('should retrieve a single blog post', async () => {
      const postId = '123';
      const mockPost = {
        id: postId,
        title: 'Test Post',
        content: 'Test content',
        category: 'Tutorial',
        isPublished: true,
        author: { firstName: 'John', lastName: 'Doe' },
      };

      BlogPost.findByPk.mockResolvedValue(mockPost);

      const response = await request(app)
        .get(`/api/blog/${postId}`)
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe(mockPost.title);
    });

    it('should return 404 for non-existent blog post', async () => {
      const postId = 'nonexistent';

      BlogPost.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .get(`/api/blog/${postId}`)
        .set(mockAuthHeader);

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/blog/:id/publish', () => {
    it('should publish a blog post', async () => {
      const postId = '123';

      BlogPost.update.mockResolvedValue([1]);
      BlogPost.findByPk.mockResolvedValue({
        id: postId,
        isPublished: true,
        publishedAt: new Date(),
      });

      const response = await request(app)
        .post(`/api/blog/${postId}/publish`)
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data.isPublished).toBe(true);
    });

    it('should return 404 for non-existent post publish', async () => {
      const postId = 'nonexistent';

      BlogPost.update.mockResolvedValue([0]);
      BlogPost.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .post(`/api/blog/${postId}/publish`)
        .set(mockAuthHeader);

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/blog/:id/unpublish', () => {
    it('should unpublish a blog post', async () => {
      const postId = '123';

      BlogPost.update.mockResolvedValue([1]);
      BlogPost.findByPk.mockResolvedValue({
        id: postId,
        isPublished: false,
        publishedAt: null,
      });

      const response = await request(app)
        .post(`/api/blog/${postId}/unpublish`)
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data.isPublished).toBe(false);
    });

    it('should return 404 for non-existent post unpublish', async () => {
      const postId = 'nonexistent';

      BlogPost.update.mockResolvedValue([0]);
      BlogPost.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .post(`/api/blog/${postId}/unpublish`)
        .set(mockAuthHeader);

      expect(response.status).toBe(404);
    });
  });
});
