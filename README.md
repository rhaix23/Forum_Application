# Online Discussion Forum Application

A programmer-themed full-stack online discussion forum application.

Live Link: https://forum-application.vercel.app/

Backend Repository: https://github.com/rhaix23/Forum_Application_Api

## Technologies Used
- MERN Stack
- TypeScript
- Redux Toolkit (State Management Solution)
- Mantine UI (Component Library)
- Vercel (Hosting Service)

## Features
- Forum is divided into sections and subsections
- User Module
- Admin Module
- Authentication using JWT tokens stored in HttpOnly cookie
- Users are allowed to post and comment
- Users are allowed to submit a report



## Installation
1. Clone the frontend and backend repositories.
2. Run 'npm install' on both.
3. Configure axios configuration on frontend.
4. Configure the allowed origins on the backend.
5. Configure .env on the backend.

```
.env

PORT
MONGO_URI
JWT_TOKEN_SECRET
JWT_REFRESH_SECRET
JWT_TOKEN_EXPIRATION 
JWT_REFRESH_EXPIRATION
```

6. Run 'npm run dev' on both to start the application.
