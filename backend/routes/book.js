import express from "express";
import { Book } from "../models/Book.js";
import { verifyAdmin } from "./auth.js";

const router = express.Router();

router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { bookName, author, bookId, bookImg } = req.body;
    console.log("book page", bookName, author, bookId, bookImg);
    const newBook = new Book({
      bookName,
      author,
      bookId,
      bookImg,
    });
    await newBook.save();
    return res.json({ added: true });
  } catch (err) {
    console.log(err);
    return res.json({ message: "error in adding book" });
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (err) {
    console.log("error in book.js", err);
  }
});

router.get("/update-book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById({ _id: id });
    return res.json(book);
  } catch (err) {
    return res.json(err);
  }
});

router.put("/update-book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndUpdate({ _id: id }, req.body);
    return res.json({ updated: true, book });
  } catch (err) {
    return res.json(err);
  }
});

router.delete("/delete-book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, book });
  } catch (err) {
    return res.json(err);
  }
});

export { router as BookRouter };
