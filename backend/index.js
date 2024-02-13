import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AdminRouter } from "./routes/auth.js";
import { StudentRouter } from "./routes/student.js";
import { BookRouter } from "./routes/book.js";

import "./db.js";
import { Student } from "./models/Student.js";
import { Book } from "./models/Book.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();
app.use("/auth", AdminRouter);
app.use("/student", StudentRouter);
app.use("/book", BookRouter);
app.use("/dashboard", async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const books = await Book.countDocuments();
    return res.json({ ok: true, students, books });
  } catch (err) {
    return res.json(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log("server has started");
});
