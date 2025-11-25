require("dotenv").config();

const express = require("express");
const sequelize = require("./db");

const router = require("./routes/index");
const models = require("./models/models");

const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 5002;

const corsOptions = {
  origin: 'http://212.67.9.16:3000', // Укажите точный адрес вашего фронтенда
  credentials: true, // Если нужно передавать куки/аутентификацию
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};


app.use(cors(corsOptions));
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
