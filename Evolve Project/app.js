//api - localhost:3000/api/register

require("dotenv").config();
const express = require("express");
const registerRoutes = require("./routes/registerRoutes");

require("./db/connect");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/register", registerRoutes);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Evolv");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
