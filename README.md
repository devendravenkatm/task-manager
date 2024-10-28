# Task Mate - Your Personal Task Manager

## Overview

The **Task Mate** is a simple yet powerful web application developed using the MEAN stack (MongoDB, Express.js, Angular, and Node.js). It allows users to efficiently manage their tasks with features like adding, editing, and deleting tasks.

## Features

- **User Specific**: Each user can manage their own tasks securely.
- **Add Tasks**: Users can add new tasks with a description and due date.
- **Edit Tasks**: Users can update existing tasks, modifying details such as the task description or due date.
- **Delete Tasks**: Users can remove tasks they no longer need from the task list.
- **Real-Time Updates**: The application uses the power of Angular to update the task list dynamically, providing a seamless user experience.

## Technologies Used

- **Front-End**: Angular (Angular CLI), HTML, CSS
- **Back-End**: Node.js, Express.js
- **Database**: MongoDB
- **Other**: Mongoose (for MongoDB object modeling)

## Installation

To get a local copy up and running, follow these simple steps:

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running on your system

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/devendravenkatm/task-manager.git
   cd task-manager

2. **Install server dependencies**

   ```bash
   cd server
   npm install

3. **Start MongoDB server**
   Ensure MongoDB is running on mongodb://localhost:27017/taskmanager

   or use Mongodb Atlas to use free shared cluster and connect the backend server using the connection string.

5. **Run the Application**

   - **First Terminal**:

     ```bash
     cd server
     npm start
     ```

   - **Second Terminal**:

     ```bash
     cd client
     ng serve
     ```
6. **Access the application**

The application will be running at : http://localhost:4200/
   
