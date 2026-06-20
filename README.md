# Employee Management System

A simple CRUD web application for managing employee records — built as a technical
assessment. Employees can be created, listed, edited, and deleted, with data persisted
in MongoDB.

## Tech Stack

| Layer    | Technology                          |
|----------|--------------------------------------|
| Frontend | React 18 (Create React App), Axios   |
| Backend  | Node.js, Express                     |
| Database | MongoDB, Mongoose                    |

## Features

- **Employee List** — table view with Employee No, Name, Designation, Salary, and Edit/Delete actions.
- **Add Employee** — modal form (top-right "+ Add Employee" button), auto-generated incrementing Employee No.
- **Edit Employee** — update Name, Designation, and Salary from the same table row.
- **Delete Employee** — remove a record, with a confirmation dialog before deleting.
- Data persists in MongoDB — refreshing the page does not lose changes.

## Project Structure

```
ems/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── employeeController.js
│   ├── models/
│   │   ├── Employee.js
│   │   └── Counter.js         # generates auto-incrementing Employee No
│   ├── routes/
│   │   └── employees.js
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── services/
        │   └── api.js          # Axios calls to the backend API
        ├── App.js               # employee table + page layout
        ├── EmployeeForm.jsx      # add/edit modal
        ├── ConfirmDialog.jsx     # delete confirmation modal
        ├── index.js
        └── index.css
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- A MongoDB connection string — either a local MongoDB instance
  (`mongodb://localhost:27017/employee_management`) or a free
  [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set MONGO_URI to your MongoDB connection string
npm run dev      # starts on http://localhost:5000
```

`.env` variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee_management
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if your backend isn't running on http://localhost:5000/api
npm start         # starts on http://localhost:3000
```

`.env` variables:

```
REACT_APP_API_URL=http://localhost:5000/api
```

The frontend expects the backend to already be running and reachable at
`REACT_APP_API_URL`.

## API Endpoints

| Method | Endpoint              | Description                          |
|--------|------------------------|---------------------------------------|
| GET    | `/api/employees`       | List all employees                    |
| POST   | `/api/employees`       | Create a new employee                 |
| PUT    | `/api/employees/:id`   | Update an employee's name/designation/salary |
| DELETE | `/api/employees/:id`   | Delete an employee                    |

## Deployment

- **Backend**: deploy to Render/Railway (or similar). Set `MONGO_URI` (e.g. a MongoDB
  Atlas connection string) and `PORT` as environment variables.
- **Frontend**: deploy to Vercel/Netlify. Set `REACT_APP_API_URL` to the deployed
  backend's `/api` URL.
- **Database**: a free MongoDB Atlas cluster works well for this — no local install needed.

## Notes

- Employee No is auto-generated and unique (auto-incrementing via a counter collection).
- Salary accepts positive numbers with decimals.
- Delete shows a confirmation dialog before removing a record.
