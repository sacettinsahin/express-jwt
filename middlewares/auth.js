const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Authorization header is missing.");
    }

    const token = req.headers.authorization.split(" ")[1];

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, process.env.SECRET_TOKEN);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
