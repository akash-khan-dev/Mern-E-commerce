require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/dbConfig");
const app = express();
const routes = require("./router/index");
// database connection
dbConnection();
//middleware
app.use(express.json());
app.use(cors());
app.use(routes);
// app.get("/user", (req, res) => {
//   res.send("hello world!");
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
