require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const usersRoutes = require("./routes/users");
const middlewareLogRequest = require("./middleware/logs");
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Sesuaikan dengan URL frontend Anda
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Metode yang diizinkan
  allowedHeaders: ['Content-Type', 'Authorization'] // Header yang diizinkan
}));

app.use(middlewareLogRequest);
app.use(express.json())

app.use((req, res, next) => {
  console.log("middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("middleware 2");
  next();
});

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});
