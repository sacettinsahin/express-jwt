const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db.js");
const AuthRoute = require("./routes/auth.js");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit:'30mb', extended: true}));
app.use(express.urlencoded({limit:'30mb', extended: true}));

app.use("/", AuthRoute);

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

const PORT = process.env.PORT || 5000;
db();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
