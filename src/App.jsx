import { Provider } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import "./App.css";
import { ItemsList } from "./components/ItemsList";
import store from "./redux-store/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Container>
          <Row>
            <Col
              className="bg-light border mt-4 p-5 rounded"
              md={{
                offset: 3,
                size: 6,
              }}
              sm="12"
            >
              <ItemsList />
            </Col>
          </Row>
        </Container>
      </Provider>
    </div>
  );
}

export default App;
