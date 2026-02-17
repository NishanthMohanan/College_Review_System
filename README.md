#  College Review System

A full-stack MERN application where students review colleges, teachers respond, and admins manage the platform.  
Built with production-ready practices: authentication, authorization, validation, testing, seeding, and Docker deployment.

---

##  Tech Stack

| Layer        | Technology |
|--------------|------------|
| **Frontend** | React (Vite) + TailwindCSS |
| **Backend**  | Node.js + Express |
| **Database** | MongoDB + Mongoose |
| **Auth**     | JWT + bcrypt |
| **Validation** | Joi + express-validator |
| **Testing** | Jest + Supertest |
| **Deployment** | Docker + Docker Compose |

---

##  Folder Structure
```bash
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

Installation & Setup
Prerequisites

Ensure the following are installed:

Node.js
MongoDB / MongoDB Compass
Docker Desktop
Postman

Local Development Setup
1. Clone repo & setup environment
cp .env.example .env
2. Install dependencies
npm install
3. Seed sample data
npm run seed
4. Run backend & frontend (dev mode)
npm run dev
5. Run tests
npm test

Docker Setup
Start full application (MongoDB + Backend + Frontend)
Install Docker Desktop
Enable WSL (Windows users):
wsl --install
wsl --update


Build & run:
docker compose up --build
Visit:
Frontend → http://localhost:5173
Backend → http://localhost:5000/api
Stop containers
docker compose down
Start in detached mode
docker compose up -d

Seeding Data
Seed sample users & colleges:
cd exaltt3
npm run seed


This creates:
1 Admin
3 Teachers
3 Students
3 Colleges with sample reviews

Authentication & Roles
JWT-based authentication with bcrypt password hashing.
Role Permissions
Role	Permissions
Admin	Manage users, colleges, reviews
Teacher	CRUD on reviews for assigned colleges
Student	CRUD on their own reviews
JWT tokens are issued on login and verified on protected routes via middleware.

API Route Summary
Feature	Method	Endpoint	Protected
Register	POST	/api/auth/register	
Login	POST	/api/auth/login	
Get Colleges	GET	/api/colleges	
College CRUD	POST/PUT/DELETE	/api/colleges/:id	
Review CRUD	POST/PUT/DELETE	/api/reviews	
College Ratings	GET	/api/colleges/:id/reviews	
Testing (Jest + Supertest)

Run all tests:
npm test
Test Environment
Uses mongodb-memory-server

Integration test files:
src/tests/auth.test.js
src/tests/review.test.js
src/tests/setupTestDB.js

Test Coverage Report
npx jest --coverage


Output stored in:
college-review-backend/coverage/
Postman Collection

Import:
exaltt3/college-review-system/postman_collection.json


Includes:

Auth routes
College routes
Review routes
Example tokens for all roles
Seed Script Details

Path:
college-review-backend/seed/seed.js


The script:

Connects to DB
Clears existing data
Inserts sample users, colleges, reviews
Prints test credentials

Run manually:

npm run seed

Production Readiness
Area	Approach
Security	Helmet, JWT Auth, bcrypt hashing
Scalability	Modular architecture
Validation	Joi + express-validator
Testing	Jest + Supertest
Deployment	Docker Compose (3 services)
Logging	Morgan
Performance	Lean queries, indexes

Example App Workflow

User registers → /api/auth/register
Logs in → receives JWT
Sends JWT in Authorization header
Student posts review → /api/reviews
Admin views or manages colleges → /api/colleges

Key Learnings

MERN full-stack architecture
Authentication + Authorization
Secure password hashing
Integration testing with Jest
Docker-based deployment
Aggregation pipelines for average ratings
Clean MVC structure

Author
Nishanth M




