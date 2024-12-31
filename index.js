const express = require("express");
const mongoose = require("mongoose");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");
const orderRoutes = require('./route/order')
const menuRoutes = require('./route/menu')
const userRoutes = require('./route/user')
const cors = require("cors");
const port = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/order", orderRoutes);
app.use("/menu", menuRoutes);
app.use("", userRoutes);



app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
