import { useState } from "react"; //hooks used for add transaction field
import { Col, Container, Row, Button, Form } from "react-bootstrap"; //these are the in built components
import AddExpense from "./AddExpense";

const Overview = ({ expense, income }) => {
  //functional component
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Container style={{ marginTop: "50px", marginBottom: "10px" }}>
      <Row style={{ marginBottom: "35px" }}>
        <Col>
          <h3 style={{ fontWeight: "bold" }}>
            Balance : ₹{parseInt(income - expense)}
          </h3>
        </Col>
        <Col>
          <Button variant="dark" onClick={() => setIsShowing(!isShowing)}>
            ADD
          </Button>
        </Col>
      </Row>
      {isShowing ? (
        <AddExpense isShowing={isShowing} setIsShowing={setIsShowing} />
      ) : null}

      <Container
        style={{
          maxWidth: "90%",
        }}
      >
        <Row>
          <Col
            style={{
              border: "3px solid black",
              marginRight: "5px",
              padding: "5px",
            }}
          >
            <h6 style={{ fontWeight: "bold" }}>Income</h6>
            <h5 style={{ color: "#229954" }}>₹{income}</h5>
          </Col>
          <Col>
            <div
              style={{
                border: "3px solid black",
                marginLeft: "5px",
                padding: "5px",
              }}
            >
              <h6 style={{ fontWeight: "bold" }}>Expense</h6>
              <h5 style={{ color: "#e74c3c" }}>₹{expense}</h5>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Overview;
