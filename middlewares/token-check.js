require("dotenv").config();

const tokenCheck = async (req, res, next) => {
  try {
    const { APP_TOKEN } = process.env;
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error(`APP TOKEN IS REQUIRED!`);
    }

    if (authorization?.split(" ")[1] !== APP_TOKEN) {
      throw new Error(`APP TOKEN MISMATCH!`);
    }

    next();
  } catch (error) {
    return res.status(403).json({
      status: false,
      error: error?.message,
    });
  }
};

module.exports = tokenCheck;
