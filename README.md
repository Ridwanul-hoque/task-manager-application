# Task Management Application

## Description
A Task Management Application that allows users to add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections: **To-Do, In Progress, and Done**. The app ensures real-time synchronization and persistence using MongoDB and WebSockets.

## Live Demo
[Live Application Link](#) *(Replace with actual link)*

## Features
- **User Authentication**: Google Sign-In via Firebase Authentication.
- **Task Management**:
  - Add, edit, delete, and reorder tasks.
  - Drag and drop tasks between categories.
  - Auto-saving of changes.
- **Database & Real-Time Updates**:
  - Tasks are stored in MongoDB.
  - Real-time updates using WebSockets or MongoDB Change Streams.
- **Modern & Responsive UI**:
  - Built with **React + Vite**.
  - Drag-and-drop functionality using `react-beautiful-dnd`.
  - Fully responsive for mobile and desktop.
- **Additional Features**:
  - Dark Mode toggle.
  - Task due dates with color indicators for overdue tasks.
  - Activity log tracking changes.

## Technologies Used
### Frontend:
- **React (Vite.js)** – Fast development and modern UI.
- **Firebase Authentication** – Secure Google Sign-in.
- **react-beautiful-dnd** – Drag and drop functionality.
- **Tailwind CSS** – Clean and responsive styling.

### Backend:
- **Node.js + Express.js** – API handling.
- **MongoDB + Mongoose** – Database storage.
- **WebSockets / MongoDB Change Streams** – Real-time updates.

## Installation Guide

### Prerequisites:
- Node.js installed
- MongoDB instance (local or cloud)
- Firebase project setup

### Setup Instructions:
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. **Backend Setup:**
   ```sh
   cd backend
   npm install
   ```
   - Create a `.env` file and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
   - Start the server:
     ```sh
     npm start
     ```

3. **Frontend Setup:**
   ```sh
   cd frontend
   npm install
   ```
   - Create a `.env` file and add:
     ```env
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     ```
   - Start the frontend:
     ```sh
     npm run dev
     ```

## API Endpoints
| Method | Endpoint        | Description |
|--------|---------------|-------------|
| POST   | `/tasks`       | Add a new task |
| GET    | `/tasks`       | Get all tasks for logged-in user |
| PUT    | `/tasks/:id`   | Update task details |
| DELETE | `/tasks/:id`   | Delete a task |

## Folder Structure
```
project-root/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── App.js
│
├── README.md
```

## Contributing
Pull requests are welcome! Please follow best practices and ensure all changes are tested before submitting.

## License
This project is licensed under the MIT License.

---

Feel free to modify this README file as needed to fit your project specifics!