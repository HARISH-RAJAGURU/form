const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Harish@10",
  port: 5432,
});

app.post("/", async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const newData = await pool.query(
      "INSERT INTO details(firstName,lastName,email,dob,gender,city, state_,country) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        data.firstName,
        data.lastName,
        data.email,
        data.dob,
        data.gender,
        data.city,
        data.state,
        data.country,
      ]
    );
    res.json(newData.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/all", async (req, res) => {
  try {
    const allData = await pool.query("SELECT * FROM details");
    // console.log(allData);
    res.send(allData.rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(5001, () => {
  console.log("Server started at port 5001");
});
