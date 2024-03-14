import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "bookstore",
  initialState: {
    booksInStore: {
      books: [],
    },
    modalController: false,
    bookEntry: true,
    selectBook: {
      bookNumber: null,
      bookDetails: {},
    },
  },
  reducers: {
    setInitialBook: (state, action) => {
      state.booksInStore.books = [...action.payload];
    },
    addBook: (state, action) => {
      const newBookEntry = action.payload;
      state.booksInStore.books.push(newBookEntry);

      localStorage.setItem(
        "bookstore",
        JSON.stringify(state.booksInStore.books)
      );
    },
    deleteBook: (state, action) => {
      const bookId = action.payload;
      state.booksInStore.books = state.booksInStore.books.filter(
        (book, id) => id !== bookId
      );

      localStorage.setItem(
        "bookstore",
        JSON.stringify(state.booksInStore.books)
      );
    },
    updatedBook: (state, action) => {
      const { bookIndex, bookDetails } = action.payload;
      state.booksInStore.books[bookIndex] = {
        ...state.booksInStore.books[bookIndex],
        ...bookDetails,
      };

      localStorage.setItem(
        "bookstore",
        JSON.stringify(state.booksInStore.books)
      );
    },
    openModal: (state) => {
      state.modalController = !state.modalController;
      state.bookEntry = true;
      state.selectBook.bookNumber = null;
      state.selectBook.bookDetails = {};
    },
    getBookDetails: (state, action) => {
      const bookName = action.payload;
      state.bookEntry = false;
      state.selectBook.bookNumber = bookName;
      state.selectBook.bookDetails = state.booksInStore.books[bookName];
      state.modalController = !state.modalController;
    },
  },
});

export const {
  setInitialBook,
  addBook,
  deleteBook,
  openModal,
  updatedBook,
  getBookDetails,
} = bookSlice.actions;

export const allBooksInStore = (state) => state.bookstore.booksInStore;
export const ModalController = (state) => state.bookstore.modalController;
export const BookEntry = (state) => state.bookstore.bookEntry;
export const SelectedBook = (state) => state.bookstore.selectBook;

export default bookSlice.reducer;
