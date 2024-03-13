import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  openModal,
  selectBookEntry,
  selectModalController,
  selectSelectedBook,
  updatedBook,
} from "./bookSlice";

function BookModal() {
  const modalState = useSelector(selectModalController);
  const newEntry = useSelector(selectBookEntry);
  const selectedBook = useSelector(selectSelectedBook);
  const storeTrigger = useDispatch();
  return (
    <div>
      <Modal
        show={modalState}
        onHide={() => storeTrigger(openModal())}
        centered
        keyboard={false}>
        <Modal.Header closeButton className='bg-primary text-dark'>
          {newEntry ? "Add A New Book" : "Edit Book Details"}
        </Modal.Header>
        <Modal.Body>
          <Form
            id='bookForm'
            onSubmit={async (e) => {
              e.preventDefault();
              const formEntry = e.target.elements;
              const formData = newEntry
                ? {
                    name: formEntry?.bookname.value,
                    price: formEntry?.price.value,
                    category: formEntry?.category.value,
                    description: formEntry?.description.value,
                  }
                : {
                    bookIndex: selectedBook.bookNumber,
                    bookDetails: {
                      name: formEntry?.bookname.value,
                      price: formEntry?.price.value,
                      category: formEntry?.category.value,
                      description: formEntry?.description.value,
                    },
                  };
              newEntry
                ? await storeTrigger(addBook(formData))
                : await storeTrigger(updatedBook(formData));
              e.target.reset();
              storeTrigger(openModal());
            }}>
            <FloatingLabel
              className='mb-3'
              name='bookname'
              controlId='bookname'
              label='Title'>
              <Form.Control
                type='text'
                required
                defaultValue={selectedBook?.bookDetails.name}
                placeholder='Title'></Form.Control>
            </FloatingLabel>
            <Row>
              <Col md={6}>
                <FloatingLabel
                  className='mb-3'
                  name='price'
                  controlId='price'
                  label='Price'>
                  <Form.Control
                    type='number'
                    required
                    defaultValue={selectedBook?.bookDetails.price}
                    placeholder='Price'></Form.Control>
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel
                  className='mb-3'
                  name='category'
                  controlId='category'
                  label='Category'>
                  <Form.Control
                    type='text'
                    required
                    defaultValue={selectedBook?.bookDetails.category}
                    placeholder='Category'></Form.Control>
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel
              className='mb-3'
              name='description'
              controlId='description'
              label='Description'>
              <Form.Control
                as='textarea'
                required
                placeholder='Description'
                defaultValue={selectedBook?.bookDetails.description}
                style={{ height: "80px" }}></Form.Control>
            </FloatingLabel>
            <Button variant='primary' type='submit'>
              {newEntry ? (
                <>
                  Add A Book <i className='bi bi-journal-plus'></i>
                </>
              ) : (
                <>
                  Update Book Details <i className='bi bi-pencil-square'></i>
                </>
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BookModal;
