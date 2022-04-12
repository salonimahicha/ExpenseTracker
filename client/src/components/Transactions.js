import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"; // We are importing Container components  from the library react-bootstrap

const Transactions = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const searchData = (searchField) => {
    setSearchText(searchField);

    //
    if (searchText != "") {
      const tempData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });

      setFilteredData(tempData);
    } else {
      //
      setFilteredData(data);
    }
  };

  return (
    <Container style={{ marginTop: "35px", marginBottom: "10px" }}>
      <Row>
        <h3 style={{ fontWeight: "bold" }}>Transactions</h3>
      </Row>
      <Row>
        <Col>
          <input
            placeholder="Search Transactions"
            style={{
              width: "90%",
              borderRadius: "80px",
              height: "50px",
              borderColor: "gray",
              padding: "10px",
            }}
            value={searchText}
            onChange={(e) => searchData(e.target.value)}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col>
          {searchText.length > 1 ? (
            filteredData.map((item) => {
              return (
                <Row
                  style={{
                    border: "3px solid",

                    borderRight: "8px solid",
                    borderRightColor:
                      item.type === "Expense" ? "#e74c3c" : "#229954",
                    borderRadius: "5px",
                    marginTop: "7px",
                  }}
                  key={item.id}
                >
                  <Col>
                    <p style={{ fontSize: "20px" }}>{item.description}</p>
                  </Col>
                  <Col>
                    <p style={{ fontSize: "20px" }}>{item.amount}</p>
                  </Col>
                </Row>
              );
            })
          ) : data.length !== 0 ? (
            data.map((item) => {
              return (
                <Row
                  style={{
                    border: "3px solid",

                    borderRight: "8px solid",
                    borderRightColor:
                      item.type === "Expense" ? "#e74c3c" : "#229954",
                    borderRadius: "5px",
                    marginTop: "7px",
                  }}
                  key={item.id}
                >
                  <Col>
                    <p style={{ fontSize: "20px" }}>{item.description}</p>
                  </Col>
                  <Col>
                    <p style={{ fontSize: "20px" }}>{item.amount}</p>
                  </Col>
                </Row>
              );
            })
          ) : (
            <p>No Expense Added</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Transactions;
