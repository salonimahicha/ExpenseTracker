// All the neccessary imports
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const { v4: uuidv4 } = require("uuid");

app.use(cors());
// Required for parsing the incoming request

app.use(express.urlencoded());
app.use(express.json());

//JSON Files proccessing
const fs = require("fs");
const localDB = "./db.json";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/alltransactions", (req, res) => {
  if (!fs.existsSync(localDB)) {
    res.status(500).send({ error: "NO TRANSACTIONS ADDED" });
  } else {
    var data = fs.readFileSync(localDB, "utf8");
    if (data.length === 0) {
      res.status(500).send({ error: "NO TRANSACTIONS ADDED" });
    } else {
      let parsedData = JSON.parse(data);
      res.json(parsedData);
    }
  }
  // res.send()
});

app.post("/add", (req, res) => {
  let toSave = {
    id: uuidv4(),
    timestamp: Date.now(),
    description: req.body.description,
    amount: req.body.amount,
    type: req.body.type,
  };
  console.log(req.body);

  if (!fs.existsSync(localDB)) {
    var list = [];
    if (list instanceof Array) list.push(toSave);
    fs.writeFileSync(localDB, JSON.stringify(list));
  } else {
    var data = fs.readFileSync(localDB, "utf8");
    var list = data.length ? JSON.parse(data) : [];
    if (list instanceof Array) list.push(toSave);
    else list = [toSave];
    fs.writeFileSync(localDB, JSON.stringify(list));
  }

  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
