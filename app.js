require("dotenv").config();

const express = require("express");
const sequelize = require("./db");

const router = require("./routes/index");
const models = require("./models/models");

const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 5002;

app.use(cors({ origin: 'http://212.67.9.16:3000' }));
app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

module.exports = app;
