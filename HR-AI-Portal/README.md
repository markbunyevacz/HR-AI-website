# HR AI Certification Portal

This repository contains the source code for the HR AI Certification Portal, a full-stack web application for HR AI professionals to register, learn CAHIS™ certification content, share knowledge via a blog and community chat, and manage their digital profiles.

## Project Overview

- **Frontend**: React 18 with Vite, React Router, Axios, and Socket.io-client.
- **Backend**: Node.js with Express, Tesseract.js for OCR, and Socket.io for real-time chat.
- **Database**: PostgreSQL for relational data.
- **Authentication**: JWT with bcrypt for password hashing.
- **Features**: User registration, learning platform, CV digitalization (OCR), blog, community chat, content protection (watermarking, anti-copy).

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- PostgreSQL

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd hr-ai-portal
    ```

2.  **Install dependencies for all workspaces:**
    ```bash
    npm run install-all
    ```

3.  **Set up environment variables:**
    -   Create a `.env` file in the `backend` directory. See `backend/.env.example` for required variables.

4.  **Run database migrations:**
    -   (Instructions to be added once migration scripts are created)

### Running the Application

-   **Development mode (frontend and backend concurrently):**
    ```bash
    npm run dev
    ```

-   **Frontend only:**
    ```bash
    npm run dev --workspace=frontend
    ```

-   **Backend only:**
    ```bash
    npm run dev --workspace=backend
    ```

## Project Structure

```
HR-AI-Portal/
├── frontend/         # React app
├── backend/          # Node/Express API
├── database/         # Migration scripts, seeds
├── .gitignore
├── package.json
└── README.md
```
