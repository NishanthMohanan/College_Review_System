# College Review System — Production-Ready MERN Application

A scalable, production-ready full-stack MERN application where students can review colleges, teachers can respond, and administrators can manage the platform with full access control.

This system was designed using enterprise backend practices including modular architecture, secure authentication, role-based authorization, validation, testing, and containerized deployment.

This project demonstrates real-world backend and full-stack engineering capability.

---

## Core Features

Authentication and secure login system  
Role-Based Access Control (Admin, Teacher, Student)  
College review and rating system  
Teacher response system  
Admin management dashboard support  
RESTful API architecture  
Secure password hashing and JWT authentication  
Production-ready backend structure  
Containerized deployment using Docker  

---

## Technology Stack

| Layer | Technology |
|------|------------|
| Frontend | React + Vite + TailwindCSS |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcrypt |
| Validation | Joi + express-validator |
| Testing | Jest + Supertest |
| Deployment | Docker + Docker Compose |

---

## Authentication and Authorization

Secure authentication is implemented using JWT tokens and bcrypt password hashing.

Role-based permissions:

Admin  
• Manage users  
• Manage colleges  
• Manage reviews  

Teacher  
• View assigned colleges  
• Respond to reviews  

Student  
• Create reviews  
• Edit own reviews  
• View colleges  

All protected routes require JWT verification middleware.

---

## Installation and Setup

### Prerequisites

Node.js  
MongoDB  
Docker  
Postman  

---

### Local Development Setup

Clone repository:

git clone https://github.com/NishanthMohanan/College_Review_System.git


Create environment file:

cp .env.example .env


Install dependencies:

npm install


Seed database:

npm run seed


Start development servers:

npm run dev


---

## Docker Deployment

Start full application stack:

docker compose up --build


Access services:

Stop containers:

docker compose down


---

## Testing

Integration tests implemented using Jest and Supertest.

Run tests:

npm test


---

## Database Seeding

Seed script automatically creates:

Admin account  
Teacher accounts  
Student accounts  
Sample colleges  
Sample reviews  

Run manually:

npm run seed


---

## Security Implementation

JWT authentication  
Password hashing using bcrypt  
Route protection middleware  
Input validation  
Secure headers  
Environment variable protection  

---

## Production-Ready Engineering Practices

Modular architecture  
Separation of concerns  
Reusable middleware  
Containerized deployment  
Integration testing  
Environment-based configuration  

---

## Example Workflow

User registers account  
User logs in and receives JWT token  
Student creates review  
Teacher responds to review  
Admin manages colleges and users  

---

## Project Purpose

This project demonstrates:

Production-ready backend architecture  
Full-stack MERN development  
Authentication and authorization implementation  
Database schema design  
REST API development  
Docker-based deployment  

This architecture can be reused for building scalable SaaS or enterprise applications.

---

## Author

Nishanth M  


