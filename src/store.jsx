import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookstore/books";

export default configureStore({
  reducer: {
    books: bookReducer,
  },
});
