const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db.js");

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

db();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
