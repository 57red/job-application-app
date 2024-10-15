const express = require("express");
const cors = require("cors");
const app = express();

// routes
const applicationRoutes = require("./routers/applicationRoutes");

const PORT = 5000;

// database
const pool = require("./database/database");

// middlewares
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/", applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}...`);
});
