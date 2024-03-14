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
    setInitialBook: (state, initialBookList) => {
      const InitialBookList = initialBookList.payload;
      state.booksInStore.books = InitialBookList;
    },
    addBook: (state, newBook) => {
      const NewBookEntry = newBook.payload;
      state.booksInStore.books.push(NewBookEntry);
    },
    deleteBook: (state, bookId) => {
      const BookListHolder = state.booksInStore;
      BookListHolder.books = BookListHolder.books.filter(
        (book, id) => id !== bookId.payload
      );
      state.bookList = BookListHolder;
    },
    updatedBook: (state, bookToChange) => {
      const bookUpdatedDetails = bookToChange.payload.bookDetails;
      const index = bookToChange.payload.bookIndex;
      const booksInStore = state.booksInStore;
      booksInStore.books[index] = {
        ...booksInStore.books[index],
        ...bookUpdatedDetails,
      };
      state.bookList = booksInStore;
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
      state.selectBook.bookDetails = state.booksInStore.books[bookName.payload];
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
