import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

const AddExpense = ({ isShowing, setIsShowing, forceUpdate }) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setIsExpense] = useState(true);

  console.log("rendering...");

  const submitValue = () => {
    const frmdetails = {
      description: desc,
      amount: amount,
      type: isExpense ? "Expense" : "Income",
    };

    // console.log(frmdetails);

    fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frmdetails),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container
      style={{
        border: "3px solid gray",
        borderRadius: "5px",
        maxWidth: "100%",
        alignSelf: "center",
        marginBottom: "25px",
      }}
    >
      <div>
        <Row style={{ textAlign: "center", alignItems: "center" }}>
          <Form className="col-lg-12 offset-lg p-3 ">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                inline
                name="group1"
                type={"radio"}
                id="type-1"
                label="Expense"
                // value={isExpense}
                checked={isExpense}
                onClick={() => setIsExpense(true)}
              />
              <Form.Check
                inline
                name="group1"
                type={"radio"}
                id="type-2"
                label="Income"
                value={!isExpense}
                onClick={() => setIsExpense(false)}
              />
            </Form.Group>
            <Button
              variant="dark"
              type="submit"
              onClick={() => {
                setIsShowing(!isShowing);
                submitValue();
                window.location.reload(false);
              }}
            >
              Add Transaction
            </Button>
          </Form>
        </Row>
      </div>
    </Container>
  );
};

export default AddExpense;
