<div align="center">
  <br />
  <h1>MERN + OAuth Image Search App</h1>
  <p>
    A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with <strong>shadcn/ui</strong>. This app allows authenticated users to search for images using the Unsplash API, view a personal search history, and see top searches from all users.
  </p>
  <p>(<i>This project was built as part of an internship task.</i>)</p>
  <br />
</div>


## ✨ Key Features

* **OAuth Authentication:** Secure login with Google, Facebook, and GitHub using Passport.js.
* **Dynamic Image Search:** Fetches high-resolution images from the Unsplash API.
* **Multi-Select:** Users can select multiple images from the search results.
* **User Search History:** A private sidebar component that shows the logged-in user's past search terms.
* **Top Searches:** A public banner showing the top 5 most frequent search terms across all users.
* **Modern UI:** A clean, responsive, and beautiful UI built with **React**, **Vite**, **Tailwind CSS**, and **shadcn/ui**.
* **Protected Routes:** Only authenticated users can access the dashboard and search functionality.

## 🚀 Tech Stack

* **Frontend:**
    * React.js
    * Vite
    * Tailwind CSS
    * shadcn/ui
    * Lucide React (Icons)
    * Axios
* **Backend:**
    * Node.js
    * Express.js
    * MongoDB
    * Mongoose
* **Authentication:**
    * Passport.js (Google, Facebook, GitHub)
    * Express Sessions
* **APIs:**
    * Unsplash API

---

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Prerequisites

* **Node.js** (v18 or later)
* **Git**
* **MongoDB:** A local MongoDB installation or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.

### 2. Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/sayyub80/image-search.git]
    cd image-search
    ```

2.  **Install root dependencies:**
    *(This installs `concurrently` to run both servers)*
    ```bash
    npm install
    ```

3.  **Install server dependencies:**
    ```bash
    npm install --prefix server
    ```

4.  **Install client dependencies:**
    ```bash
    npm install --prefix client
    ```

### 3. Environment Variables

This is the most critical step. Create a file named `.env` in the **`/server`** directory:

```bash
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
