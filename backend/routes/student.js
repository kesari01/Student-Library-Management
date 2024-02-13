import express from "express";
import bcrypt from "bcrypt";
import { Student } from "../models/Student.js";
import { verifyAdmin } from "./auth.js";

const router = express.Router();

router.post("/register", verifyAdmin, async (req, res) => {
  try {
    const { username, name, semester, password } = req.body;
    const student = await Student.findOne({ username });
    if (student) {
      return res.json({ message: "Student is already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      username,
      name,
      semester,
      password: hashPassword,
    });
    await newStudent.save();
    return res.json({ registered: true });
  } catch (err) {
    console.log(err);
    return res.json({ message: "error in registering student" });
  }
});

router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    return res.json(students);
  } catch (err) {
    console.log("error in student.js", err);
  }
});

router.get("/update-student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById({ _id: id });
    return res.json(student);
  } catch (err) {
    return res.json(err);
  }
});

router.put("/update-student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByIdAndUpdate({ _id: id }, req.body);
    return res.json({ updated: true, student });
  } catch (err) {
    return res.json(err);
  }
});

export { router as StudentRouter };
