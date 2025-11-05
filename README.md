📋 Project Goal
This project was built to fulfill an internship task that evaluates a full-stack understanding of authentication, frontend/backend integration, and data management.

✨ Key Features
OAuth Authentication: Secure login with Google, Facebook, and GitHub using Passport.js.

Dynamic Image Search: Fetches high-resolution images from the Unsplash API.

Multi-Select: Users can select multiple images from the search results.

User Search History: A private sidebar component that shows the logged-in user's past search terms.

Top Searches: A public banner showing the top 5 most frequent search terms across all users.

Modern UI: A clean, responsive, and beautiful UI built with React, Vite, Tailwind CSS, and shadcn/ui.

Protected Routes: Only authenticated users can access the dashboard and search functionality.

🚀 Tech Stack
Frontend:

React.js

Vite

Tailwind CSS

shadcn/ui

Lucide React (Icons)

Axios

Backend:

Node.js

Express.js

MongoDB

Mongoose

Authentication:

Passport.js (Google, Facebook, GitHub)

Express Sessions

APIs:

Unsplash API

🏁 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

1. Prerequisites
Node.js (v18 or later)

Git

MongoDB: A local MongoDB installation or a free MongoDB Atlas account.

2. Installation & Setup
Clone the repository:

Bash

git clone https://github.com/your-username/mern-image-search.git
cd mern-image-search
Install root dependencies:

Bash

npm install
Install server dependencies:

Bash

npm install --prefix server
Install client dependencies:

Bash

npm install --prefix client
3. Environment Variables
This is the most critical step. Create a file named .env in the /server directory:

Bash

# /server/.env
# ---------------------------------

# --- Database ---
MONGO_URI=your_mongodb_connection_string

# --- Unsplash API ---
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# --- Session ---
SESSION_SECRET=a_very_strong_and_random_secret_key

# --- Server & Client ---
PORT=5000
CLIENT_URL=http://localhost:5173

# --- Google OAuth ---
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=/auth/google/callback

# --- Facebook OAuth ---
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
FACEBOOK_CALLBACK_URL=/auth/facebook/callback

# --- GitHub OAuth ---
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=/auth/github/callback
4. API Credentials & Callback URLs
You must configure your callback URLs in each developer console to match your server's address (http://localhost:5000).

Unsplash:

Go to: unsplash.com/developers/apps

Get your Access Key.

Google:

Go to: console.cloud.google.com

Authorized JavaScript origins: http://localhost:5173

Authorized redirect URIs: http://localhost:5000/auth/google/callback

GitHub:

Go to: github.com/settings/developers

Homepage URL: http://localhost:5173

Authorization callback URL: http://localhost:5000/auth/github/callback

Facebook:

Go to: developers.facebook.com/apps

Valid OAuth Redirect URIs: http://localhost:5000/auth/facebook/callback

Add email to your app's permissions.

5. Run the Application
Run the app from the root directory:

Bash

npm run dev
This will start both the frontend (http://localhost:5173) and the backend (http://localhost:5000) concurrently.
