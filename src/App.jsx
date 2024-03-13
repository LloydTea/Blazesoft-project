import { Button, Col, Container, Row } from "react-bootstrap";
import BookStore from "./bookstore/Bookstore";
import BookModal from "./bookstore/BookModal";

function App() {
  return (
    <>
      <Container className='min-vh-100'>
        <BookStore />
        <BookModal />
      </Container>
      <footer className='my-5'>
        <Row>
          <Col>
            <div className='text-center'>
              <a
                className='btn btn-warning mx-2'
                target='_blank'
                href='https://github.com/LloydTea/Blazesoft-project'>
                Author <i className='bi bi bi-person-lines-fill'></i>
              </a>
              <a
                className='btn btn-primary mx-2'
                target='_blank'
                href='https://github.com/LloydTea/Blazesoft-project'>
                Git Repo <i className='bi bi-github'></i>
              </a>
            </div>
          </Col>
        </Row>
      </footer>
    </>
  );
}

export default App;
