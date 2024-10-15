const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 5000;

// database
const pool = require("./database/database");

// middlewares
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}...`);
});
