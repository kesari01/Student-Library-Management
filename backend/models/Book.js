import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  author: { type: String, required: true },
  bookId: { type: String, required: true },
  bookImg: { type: String, required: true },
});

const bookModel = mongoose.model("Book", bookSchema);

export { bookModel as Book };
