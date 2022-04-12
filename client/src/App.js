import Header from "./components/Header";
import Overview from "./components/Overview";
import Transactions from "./components/Transactions";
import { Container } from "react-bootstrap"; //imported the library react bootstrap and used the container component of it
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  const getData = () => {
    setLoading(true);
    fetch("http://localhost:5000/alltransactions", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        res
          .json()
          .then((response) => {
            if (res.status !== 500) {
              setData(response);
              setLoading(false);
            } else {
              setError(response.error);
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setError(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setData([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    calculate();
  }, [data]);

  const calculate = () => {
    let ex = 0;
    let inc = 0;

    // Adding all the expense and income amounts
    data.map((item) => {
      console.log("Hello: ", parseInt(item.amount));
      let amt = parseInt(item.amount);
      if (item.type === "Expense") {
        ex = ex + amt;
      } else {
        inc = inc + amt;
      }
    });

    setExpense(ex);
    setIncome(inc);
  };

  return (
    <div>
      <Container
        style={{ textAlign: "center", marginTop: "50px", maxWidth: "50%" }}
      >
        <Header />
        <Overview expense={expense} income={income} />
        <Transactions data={data} />
      </Container>
    </div>
  );
}

export default App;
