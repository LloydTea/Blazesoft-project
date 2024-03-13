import { configureStore } from "@reduxjs/toolkit";
import bookSliceReducer from "./bookstore/bookSlice";

export default configureStore({
  reducer: {
    bookstore: bookSliceReducer,
  },
});
