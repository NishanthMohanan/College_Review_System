import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../src/models/userModel.js";
import College from "../src/models/collegeModel.js";
import Review from "../src/models/reviewModel.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    console.log(" MongoDB Connected");

    console.log(" Clearing old data...");
    await User.deleteMany();
    await College.deleteMany();
    await Review.deleteMany();

    // Hash common password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Password@123", salt);

   
    // USERS
    console.log(" Creating users...");

    const adminUser = {
      name: "Admin User",
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: hashedPassword,
      role: "admin",
    };

    const teacherUsers = [
      { name: "Teacher 1", email: "teacher1@example.com", password: hashedPassword, role: "teacher" },
      { name: "Teacher 2", email: "teacher2@example.com", password: hashedPassword, role: "teacher" },
      { name: "Teacher 3", email: "teacher3@example.com", password: hashedPassword, role: "teacher" },
    ];

    const studentUsers = [
      { name: "Student 1", email: "student1@example.com", password: hashedPassword, role: "student" },
      { name: "Student 2", email: "student2@example.com", password: hashedPassword, role: "student" },
      { name: "Student 3", email: "student3@example.com", password: hashedPassword, role: "student" },
    ];

    const users = await User.insertMany([adminUser, ...teacherUsers, ...studentUsers]);
    console.log(" Users inserted:", users.length);

    // ------------------------------------------------------------
    // COLLEGES
    // ------------------------------------------------------------
    console.log(" Creating colleges...");
    const colleges = await College.insertMany([
      {
        name: "National Institute of Technology Trichy",
        location: "Tamil Nadu",
        description: "Top NIT with excellent placements and facilities.",
      },
      {
        name: "Indian Institute of Science",
        location: "Bangalore",
        description: "World-class research and innovation environment.",
      },
      {
        name: "Anna University",
        location: "Chennai",
        description: "Strong academic foundation with diverse courses.",
      },
    ]);
    console.log("Colleges inserted:", colleges.length);

    // REVIEWS
    console.log(" Creating reviews...");

    const allStudents = users.filter(u => u.role === "student");
    const allTeachers = users.filter(u => u.role === "teacher");

    const reviews = [
  {
    college: colleges[0]._id,
    user: allStudents[0]._id,
    title: "Excellent Experience",
    rating: 5,
    comment: "Amazing faculty and placements!",
  },
  {
    college: colleges[0]._id,
    user: allTeachers[0]._id,
    title: "Strong Academics",
    rating: 4,
    comment: "Good academic structure and infrastructure.",
  },
  {
    college: colleges[1]._id,
    user: allStudents[1]._id,
    title: "Best for Research",
    rating: 5,
    comment: "Fantastic research opportunities!",
  },
  {
    college: colleges[1]._id,
    user: allTeachers[1]._id,
    title: "Collaborative Environment",
    rating: 4,
    comment: "Great facilities and collaboration.",
  },
  {
    college: colleges[2]._id,
    user: allStudents[2]._id,
    title: "Good Learning",
    rating: 4,
    comment: "Decent campus life and faculty.",
  },
  {
    college: colleges[2]._id,
    user: allTeachers[2]._id,
    title: "Motivated Students",
    rating: 5,
    comment: "Students are very dedicated and hardworking.",
  },
  ];

    await Review.insertMany(reviews);
    console.log(" Reviews inserted:", reviews.length);

    // ------------------------------------------------------------
    // UPDATE COLLEGE AVERAGE RATINGS
    // ------------------------------------------------------------
    console.log(" Updating college ratings...");
    for (const college of colleges) {
      const collegeReviews = await Review.find({ college: college._id });
      const avgRating =
        collegeReviews.reduce((acc, r) => acc + r.rating, 0) / collegeReviews.length;
      college.averageRating = avgRating.toFixed(1);
      college.reviewCount = collegeReviews.length;
      await college.save();
    }

    console.log(" Seeding completed successfully!");
    console.log("Admin login:");
    console.log(`Email: ${process.env.ADMIN_EMAIL || "admin@example.com"}`);
    console.log("Password: Password@123");

    process.exit(0);
  } catch (err) {
    console.error(" Seed error:", err.message);
    process.exit(1);
  }
};

seedData();
