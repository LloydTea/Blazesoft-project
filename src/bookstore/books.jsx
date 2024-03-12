import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    bookList: {
      books: [
        {
          name: "Harry Potter",
          category: "Science Fiction",
          price: 200,
          description: "Lorem ipsum is a dummy text",
        },
      ],
    },
    modalController: false,
    bookEntry: true,
    selectBook: {
      bookNumber: null,
      bookDetails: {
        name: "",
        category: "",
        price: "",
        description: "",
      },
    },
  },
  reducers: {
    addBook: (state, newBook) => {
      const NewBookEntry = newBook.payload;
      state.bookList.books.push(NewBookEntry);
    },
    deleteBook: (state, bookId) => {
      const BookListHolder = state.bookList;
      BookListHolder.books = BookListHolder.books.filter(
        (book, id) => id !== bookId.payload
      );
      state.bookList = BookListHolder;
    },
    udpatedBook: (state, bookToChange) => {
      const bookUpdatedDetails = bookToChange.payload.bookDetails;
      const index = bookToChange.payload.bookIndex;
      const bookList = state.bookList;
      bookList.books[index] = {
        ...bookList.books[index],
        ...bookUpdatedDetails,
      };
      state.bookList = bookList;
    },
    openModal: (state) => {
      state.modalController = !state.modalController;
      state.bookEntry = true;
      state.selectBook.bookNumber = null;
      state.selectBook.bookDetails = {};
    },
    getBookDetails: (state, bookName) => {
      state.bookEntry = false;
      state.selectBook.bookNumber = bookName.payload;
      state.selectBook.bookDetails = state.bookList.books[bookName.payload];
      state.modalController = !state.modalController;
    },
  },
});

export const { addBook, deleteBook, openModal, udpatedBook, getBookDetails } =
  bookSlice.actions;

export default bookSlice.reducer;
