# SkillForge - Course Commerce Suite

SkillForge is a full-stack, SaaS-grade course-selling platform. It features a robust Node.js/Express backend with MongoDB and a beautiful, modern React frontend styled with Tailwind CSS.

## Features
- **Frontend**: Built with Vite and React. Fully responsive and sleek user interface inspired by modern SaaS businesses. Components are elegantly extracted into reusable hooks.
- **Backend Architecture**: Clean MVC-like folder structure for the Express Server containing models, middleware, controllers, routes, and config directories.
- **Robust Security**: Utilizes JsonWebToken (JWT) for authentication across separate Admin and User models. Encrypts passwords using Bcrypt. 
- **Validation**: Strict schema typing using Zod, integrated tightly with the API handler to bubble up exact validation constraints to the frontend seamlessly.

## Getting Started

### Prerequisites
- Node.js
- MongoDB cluster connection (set in `.env`)

### Server Setup
1. `cd server`
2. `npm install`
3. Add a `.env` file referencing your MongoDB URL and JWT Secret `DB_connect=your_mongodb_uri` `jwtsecretkey=your_secret`.
4. Run `npm run dev` (Ensure `nodemon` is installed).

### Client Setup
1. `cd client`
2. `npm install`
3. Run `npm run dev`.

## Tech Stack
- MongoDB, Express.js, React, Node.js (MERN)
- Tailwind CSS v4, PostCSS
- Vite, Zod, JsonWebToken, Bcrypt
