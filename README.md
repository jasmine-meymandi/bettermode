# Bettermode Post Gallery

A responsive web application built using **Vite**, **React**, **TypeScript**, and **Tailwind CSS**. This project replicates the post list functionality of Bettermode, showcasing skills in front-end development, server-side rendering (SSR), authentication, and GraphQL integration.

## Features

1. **Post Gallery**
   - Displays a paginated list of posts.
   - Includes a “Show More” button to load additional posts.
2. **Post Details**

   - Enables users to view detailed information about each post on a separate page.
   - Navigation handled using React Router.

3. **Like Feature**

   - Implements a “Like” button in both the post gallery and post detail views.
   - Updates and displays the current number of likes dynamically.

4. **Authentication**

   - Login and logout functionality implemented for session management.
   - Access token securely managed via `.env` file.

5. **GraphQL Integration**

   - Uses Apollo Client for data fetching, caching, and executing mutations.

6. **Server-Side Rendering (SSR)**
   - Improves initial load time and SEO using SSR techniques.

## Tech Stack

- **Framework/Libraries:** Vite, React (with hooks), TypeScript, Tailwind CSS
- **Routing:** React Router
- **GraphQL Integration:** Apollo Client
- **Authentication:** Secure login/logout session handling
- **CSS Styling:** Tailwind CSS for a modern and responsive UI

---

## Folder Structure

```plaintext
bettermode/
├── dist/                # Compiled build files
├── public/              # Public assets
├── src/
│   ├── api/             # API integration
│   │   ├── authentication/  # Authentication endpoints
│   │   ├── post/            # Post-related endpoints
│   │   └── reaction/        # Reaction endpoints
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   │   ├── Auth/        # Login and logout components
│   │   ├── Post/        # Post gallery and detail components
|   |   └── HomePage/    # Home page component
│   ├── utils/           # Utility functions and context
│   ├── App.tsx          # Main app entry point
│   ├── entry-client.tsx # Client-side entry point
│   └── entry-server.tsx # Server-side entry point
├── .env                 # Environment variables (Access token, API Endpoint)
├── server.js            # Server-side Rendering
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies


```

## 🔧 Setup Instructions

### Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [NPM](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jasmine-meymandi/bettermode.git
   cd bettermode
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following:

   ```plaintext
   VITE_GRAPHQL_ENDPOINT=<your_graphql_endpoint>
   VITE_ACCESS_TOKEN=<your_access_token>
   ```

   Example (for demo purposes):

   ```plaintext
   VITE_GRAPHQL_ENDPOINT=https://api.bettermode.com/
   VITE_ACCESS_TOKEN=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdoTGt3N0JhU1IiLCJuZXR3b3JrSWQiOiI4ODQzQzY4MGx3IiwibmV0d29ya0RvbWFpbiI6ImJhc2ljLWc4MmRsM3I4LmJldHRlcm1vZGUuaW8iLCJ0b2tlblR5cGUiOiJVU0VSIiwiZW50aXR5SWQiOm51bGwsInBlcm1pc3Npb25Db250ZXh0IjpudWxsLCJwZXJtaXNzaW9ucyI6bnVsbCwic2Vzc2lvbklkIjoiTHZLRWFZbVJVelF3RFlZOVVUMWlGRll6NjlXSnJpT01IZTZGSHJtNWtMbUd4T21KQzgiLCJpYXQiOjE3MzIyNDcwNTEsImV4cCI6MTczNDgzOTA1MX0.Ss2lIcvfQYU3PFSiFuR1SLUl5K8c4pNjphRCQX76tA0

   ```

4. **Run the Application**

   - **Development Mode:**
     ```bash
     npm run dev
     ```
   - **Production Build:**
     ```bash
     npm run build
     npm run start
     ```

5. **Server-Side Rendering**
   The application is pre-configured for SSR. Ensure the `server.js` file is running:
   ```bash
   node server.js
   ```

### Credentials

For testing purposes, use the following credentials:

- **Email:** `jasmin.meymandi@gmail.com`
- **Password:** `password123`

## 📖 Documentation

### Key Components

1. **Auth Components**

   - `login.tsx`: Login page for authentication.
   - `logout.tsx`: Logout functionality.

2. **Post Components**

   - `PostItem.tsx`: Displays each post Item.
   - `PostList.tsx`: Displays paginated posts.
   - `PostDetails.tsx`: Renders detailed information about a single post.

3. **Utils**
   - `apolloClient.ts`: Configures Apollo Client for GraphQL queries.
   - `auth-context.tsx`: Context for managing authentication state.
   - `helpers.ts`: Helper function for transforming time.

### GraphQL Queries

- Located under `src/api/`.
- Includes:
  - Authentication (login/logout).
  - Post operations (fetch posts, post details).
  - Reactions (like/unlike posts).

## 📹 Video Presentation

[Watch Demo Video](#) _(Replace with your video link)_

## ✨ Enhancements

- **SSR Implementation:** Faster initial load and improved SEO.
- **Login/Logout System:** Secure session management.
- **Component Reusability:** Shared UI components like PostItem and PostList.

## 💬 Contact

- **Developer:** Jasmine Meymandi
- **Email:** [jasmin.meymandi@gmail.com](mailto:jasmin.meymandi@gmail.com)
- **GitHub:** [https://github.com/jasmine-meymandi](https://github.com/jasmine-meymandi)

---

Feel free to reach out for any further questions or clarifications!

```

```
