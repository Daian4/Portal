require("dotenv").config();
const express = require("express");
const router = require("./routes.js");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port);
