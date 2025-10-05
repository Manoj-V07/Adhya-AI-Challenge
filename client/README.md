# 🌿 Campus Sustainability Dashboard (CSD) Frontend

The Campus Sustainability Dashboard (CSD) is an interactive, gamified web-based platform designed to increase student engagement in eco-friendly practices. This repository contains the frontend application, built to provide an engaging user interface for the core EcoQuest game, leaderboards, and administrative dashboards.

## ✨ Key Features

* **Gamified Interface:** A central dashboard displaying a user's EcoPoints, badges, and real-time leaderboards.
* **Activity Logging:** Allows users to log real-world eco-friendly actions (e.g., waste recycling, energy conservation) to earn points.
* **User Roles:** Provides role-based views for students, class leaders, and NSS volunteers.
* **Responsive Design:** Optimized for seamless use on both desktop and mobile devices.

## 🚀 Tech Stack

* **Frontend Framework:** **React.js**
* **Styling:** **Tailwind CSS**
* **Package Management:** npm
* **Build Tool:** Vite (for fast development and production builds)
* **API Client:** Standard JavaScript `fetch` API

## ⚙️ Prerequisites

Before you can run the application, you must have the following installed:

* **Node.js and npm**
* The **CSD Backend API** must be running and accessible. This frontend is configured to connect to a server at `http://localhost:5000`.

## 💻 Installation

Follow these steps to set up and run the frontend on your local machine.

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[your-username]/csd-client.git
    ```

2.  **Navigate to the Project Directory:**
    ```bash
    cd csd-client
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Start the Development Server:**
    This command will launch the application and enable hot-reloading for development.
    ```bash
    npm start
    ```

The application should now be running at `http://localhost:3000`.

## 🌉 API and Data Flow

The frontend communicates with the backend API to retrieve and submit data. The core API calls are abstracted into the `src/services/api.js` file to keep components clean.

* `GET /api/users/scores`: Fetches the ranked list of all users and their EcoPoints for the leaderboard.
* `POST /api/users/log-activity`: Submits a user's activity to the backend, which updates their score in the database.

## 📦 Deployment

The application can be deployed as a static site. To create a production-ready build:

```bash
npm run build