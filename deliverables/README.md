📘 College Review System (MERN Stack)
🚀 Overview

The College Review System is a full-stack MERN application that allows students to review colleges, teachers to respond, and admins to manage the platform.
The project demonstrates authentication, authorization, CRUD operations, validation, testing, and Docker containerization — built for production readiness.

🏗️ Tech Stack
Layer	    Technology
Frontend	React (Vite) + TailwindCSS
Backend	    Node.js + Express
Database	MongoDB (Mongoose ODM)
Authentication	JWT + bcrypt password hashing
Validation	Joi + express-validator
Testing	    Jest + Supertest
Deployment	Docker + Docker Compose
Documentation	Postman Collection + README.md


📁 Folder Structure
exaltt3/
│
├── college-review-backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── tests/
│   ├── seed/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md


⚙️ Installation and Setup

1️⃣ Prerequisites

Install these tools:
Node.js
MongoDB Compass
Docker Desktop
Postman

2️⃣ Environment Setup

$cp .env.example .env
$docker-compose.yaml
$npm install
$npm run seed
$npm run dev
$npm test


🐳 Docker Setup 

To start everything (MongoDB + Backend + Frontend):
docker compose up --build
Then visit:
Frontend → http://localhost:5173
Backend → http://localhost:5000/api

Stop containers:
docker compose down

Start Docker:
docker compose up -d


🌱 Seeding Data

Seed sample users and colleges:
cd exaltt3
npm run seed

This creates sample:
1 Admin, 3 Teacher, 3 Student user
3 Colleges with sample reviews


🔐 Authentication Workflow

Role:	Permissions
Admin:	Full access (manage users, colleges, reviews)
Teacher:	CRUD on reviews for assigned colleges
Student:	Can add, edit, delete own reviews

Password hashing uses bcrypt before saving the user.
JWT tokens are issued upon login and verified on protected routes via middleware.


📘 API Routes Summary

Feature	Method	Endpoint	Protected
Register	POST	/api/auth/register
Login	POST	/api/auth/login	
Colleges	GET	/api/colleges	
College CRUD	POST/PUT/DELETE	/api/colleges/:id	✅ (Admin)
Reviews	POST/PUT/DELETE	/api/reviews(Student/Teacher)
Ratings	GET	/api/colleges/:id/reviews	


🧪 Running Tests

We use Jest + Supertest for integration testing.

Run all tests:
cd exaltt3
npm test

Test Environment
Uses mongodb-memory-server (no need for a real DB).

Example Test Files
src/tests/auth.test.js
src/tests/review.test.js
src/tests/setupTestDB.js


🧾 Postman Collection

Import college-review-system.postman_collection.json (provided in root folder).

This includes:
Auth endpoints
College endpoints
Review endpoints

Example tokens for each role


📈 Test Coverage Output
After running npm test, coverage summary appears in console.

You can generate a detailed report:
npx jest --coverage

Output is saved under:
college-review-backend/coverage/


🧰 Seed Script

Path: college-review-backend/seed/seed.js

The script:
Connects to MongoDB
Clears old data
Inserts sample colleges, users, and reviews
Prints credentials for testing

Run it manually:
npm run seed


🧱 Production Readiness
Area	    Approach
Security	Helmet middleware, JWT Auth, bcrypt hashing
Scalability	Modular route/controller structure
Validation	Joi + express-validator for strong input validation
Testing	    Jest + Supertest coverage
Deployment	Docker Compose (backend, frontend, Mongo)
Logging	    Morgan integrated for HTTP logging
Performance	Mongoose indexes and lean queries


🧩 Example Workflow

User Registration → /api/auth/register
Login → JWT token received
Token attached → Authorization Header
Student adds review → /api/reviews
Admin views college ratings → /api/colleges


🧠 Key Learning Points

Modular Express backend architecture
Secure password storage
Automated integration testing
Docker-based environment consistency
Aggregation pipelines for average ratings


👨‍💻 Author
Nishanth
📧 [nishanthmohanannair@gmail.com]