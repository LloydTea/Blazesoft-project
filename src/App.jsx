import { Container } from "react-bootstrap";
import BookStore from "./bookstore/Bookstore";
import BookModal from "./bookstore/BookModal";

function App() {
  return (
    <Container>
      <BookStore />
      <BookModal />
    </Container>
  );
}

export default App;
