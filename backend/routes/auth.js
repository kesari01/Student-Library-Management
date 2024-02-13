import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Admin } from "../models/Admin.js";
import { Student } from "../models/Student.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    console.log("req.body:", req.body);
    const { username, password, profile } = req.body;
    if (profile === "admin") {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.json({ message: "admin not register" });
      }
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        return res.json({ message: "wrong password" });
      }
      const token = jwt.sign(
        { username: admin.username, profile: "admin" },
        process.env.Admin_key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({ login: true, profile: "admin" });
    } else if (profile === "student") {
      const student = await Student.findOne({ username });
      if (!student) {
        return res.json({ message: "student not register" });
      }
      const validPassword = await bcrypt.compare(password, student.password);
      if (!validPassword) {
        return res.json({ message: "wrong password" });
      }
      const token = jwt.sign(
        { username: student.username, profile: "student" },
        process.env.Student_key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({ login: true, profile: "student" });
    } else {
    }
  } catch (err) {
    console.log(err);
  }
});

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "invalid admin" });
  } else {
    jwt.verify(token, process.env.Admin_key, (err, decode) => {
      if (err) {
        return res.json({ message: "invalid token" });
      } else {
        req.username = decode.username;
        req.profile = decode.profile;
        next();
      }
    });
  }
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "invalid user" });
  } else {
    jwt.verify(token, process.env.Admin_key, (err, decode) => {
      if (err) {
        jwt.verify(token, process.env.Student_key, (err, decode) => {
          if (err) {
            return res.json({ message: "invalid token" });
          } else {
            req.username = decode.username;
            req.profile = decode.profile;
            next();
          }
        });
      } else {
        req.username = decode.username;
        req.profile = decode.profile;
        next();
      }
    });
  }
};

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ logout: true });
});

router.get("/verify", verifyUser, (req, res) => {
  console.log("req.role", req.profile);
  return res.json({ login: true, role: req.profile, username: req.username });
});

export { router as AdminRouter, verifyAdmin };
