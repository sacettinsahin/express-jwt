const auth = require("../models/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await auth.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    if (password.length < 6)
      return res
        .status(500)
        .json({ message: "Password must be atleast 6 characters long" });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await auth.create({
      username,
      email,
      password: passwordHash,
    });

    const userToken = await jwt.sign(
      { id: newUser.id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ status: "OK", result: newUser, token: userToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await auth.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res.status(500).json({ message: "Incorrect password" });

    const userToken = await jwt.sign(
      { id: user.id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ status: "OK", result: user, token: userToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };