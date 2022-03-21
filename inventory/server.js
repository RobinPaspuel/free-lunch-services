const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cors());

app.use("/", (req, res, next) => {
  return res.status(200).json({ message: "Hello From Inventory" });
});

app.listen(8001);
