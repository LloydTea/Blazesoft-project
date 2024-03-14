import {
  Button,
  Col,
  FloatingLabel,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  openModal,
  ModalController,
  SelectedBook,
  updatedBook,
  BookEntry,
} from "./bookSlice";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

function BookModal() {
  const modalState = useSelector(ModalController);
  const entryState = useSelector(BookEntry);
  const selectedBook = useSelector(SelectedBook);
  const storeTrigger = useDispatch();
  return (
    <div>
      <Modal
        show={modalState}
        onHide={() => storeTrigger(openModal())}
        centered
        keyboard={false}>
        <Modal.Header closeButton className='bg-primary text-dark'>
          {entryState ? "Add A New Book" : "Edit Book Details"}
        </Modal.Header>
        <Modal.Body>
          <Form
            id='bookForm'
            onSubmit={async (e) => {
              e.preventDefault();
              const formEntry = e.target.elements;
              const formData = entryState
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
              entryState
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
                <InputGroup className='mb-3'>
                  <InputGroupText className='bg-transparent text-primary'>
                    $
                  </InputGroupText>
                  <FloatingLabel name='price' controlId='price' label='Price'>
                    <Form.Control
                      type='number'
                      required
                      defaultValue={selectedBook?.bookDetails.price}
                      placeholder='Price'></Form.Control>
                  </FloatingLabel>
                </InputGroup>
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
              {entryState ? (
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
