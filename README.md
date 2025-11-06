# TODO Application (MERN Stack)

A simple TODO application built using the **MERN stack** (MongoDB, Express, React, Node.js) for a workshop on full-stack development.

## Features
- Add, update, and delete todos
- Mark todos as completed
- REST API for managing todos

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB

### Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/goelashwin36/mern-workshop.git
   cd mern-workshop
   ```

2. **Install dependencies**
   ```sh
   cd server  # Navigate to backend folder
   npm install

   cd client  # Navigate to frontend folder
   npm install
   ```

3. **Setup environment variables**
   Create a `.env` file in the backend folder and add:
   ```env
   PORT=8080
   MONGO_URI=mongodb://localhost:27017/todos
   ```
4. **Setup MongoDB**
   - Install MongoDB from [MongoDB's official website](https://www.mongodb.com/try/download/community)
   - Start MongoDB server
   - Verify MongoDB is running

5. **Run the application**
   - Start the backend:
     ```sh
     cd server
     npm start
     ```
   - Start the frontend:
     ```sh
     cd client
     npm start
     ```

6. **Access the app**
   Open `http://localhost:3000` in your browser.

## API Endpoints
| Method | Endpoint         | Description           |
|--------|----------------|-------------------------|
| GET    | `/api/todos`    | Get all todos          |
| GET    | `/api/todos/:id`| Get a todo             |
| POST   | `/api/todos`    | Add a new todo         |
| PUT    | `/api/todos/:id`| Update a todo          |
| DELETE | `/api/todos/:id`| Delete a todo          |

## Contributing
Feel free to fork this repo and submit pull requests with improvements or bug fixes.

## License
This project is licensed under the MIT License.
