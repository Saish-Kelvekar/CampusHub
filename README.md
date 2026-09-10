# CampusHub

CampusHub is a full-stack college information management platform where students can securely store and manage college-related information such as announcements, events, and study notes.

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Personal dashboard
- Announcement management
  - Create
  - View
  - Update
  - Delete
- Event management
  - Create
  - View
  - Update
  - Delete
- Study notes management
  - Create
  - View
  - Update
  - Delete
- User account page
- User-specific data isolation
- User-specific data isolation enforced by the backend

## Tech Stack

### Frontend
- React
- JavaScript
- HTML
- CSS
- Vite
- React Router

### Backend
- Node.js
- Express.js
- REST APIs
- JWT authentication
- bcrypt password hashing

### Database
- MySQL

### Deployment
- React frontend deployed separately
- Express backend deployed on Render
- MySQL database hosted on Aiven

## Architecture

```text
React Frontend
      |
      | HTTP / REST API
      ↓
Express.js Backend
      |
      | JWT Authentication
      ↓
MySQL Database