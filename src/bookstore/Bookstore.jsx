import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBook,
  getBookDetails,
  openModal,
  allBooksInStore,
  setInitialBook,
} from "./bookSlice";
import { useEffect } from "react";

function BookStore() {
  const bookInStore = useSelector(allBooksInStore);
  const BookStoreTrigger = useDispatch();
  useEffect(() => {
    const storedBookstore = JSON.parse(localStorage.getItem("bookstore"));
    const initialBooks =
      storedBookstore && [storedBookstore].length > 1
        ? [storedBookstore]
        : [
            {
              name: "Harry Potter",
              category: "Science Fiction",
              price: 200,
              description: "Lorem ipsum is a dummy text",
            },
          ];
    BookStoreTrigger(setInitialBook(initialBooks));
  }, []);
  useEffect(() => {
    localStorage.setItem("bookstore", JSON.stringify(bookInStore));
  }, [bookInStore]);
  const storeTrigger = useDispatch();
  return (
    <div>
      <Row className='justify-content-center align-items-center'>
        <Col md={5} className='py-5'>
          <h2>Blazesoft</h2>
        </Col>
        <Col md={5} className='text-end p-2'>
          <Button
            variant='outline-primary'
            onClick={() => storeTrigger(openModal())}>
            <i className='bi bi-plus-circle-fill'></i> Add A Book
          </Button>
        </Col>
        <Col md={10}>
          <Row>
            {bookInStore.books.map((book, index) => (
              <Col md={3} className='p-3 d-flex flex-column' key={index}>
                <div className='book-container position-relative'>
                  <p className='fs-5 mb-0 text-center title'>{book?.name}</p>
                  <p className='fs-5 mb-0 text-primary text-center'>
                    $ {book?.price}
                  </p>
                  <div className='b_category'>{book?.category}</div>
                  <a
                    className='stretched-link'
                    onClick={() => {
                      storeTrigger(getBookDetails(index));
                    }}></a>
                </div>

                <Button
                  variant='danger rounded-top-0 w-100'
                  onClick={() => storeTrigger(deleteBook(index))}>
                  <i className='bi bi-journal-x'></i> Delete Book
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default BookStore;
