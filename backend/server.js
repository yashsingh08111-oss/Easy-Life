import express from "express";

import cors from "cors";

import authRoutes from "./Routes/authRoutes.js";


const app = express();


// MIDDLEWARE

app.use(cors());

app.use(express.json());


// ROUTES

app.use("/api/auth", authRoutes);


// TEST

app.get("/", (req, res) => {

  res.send("Server running");

});


// SERVER

const PORT = 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});