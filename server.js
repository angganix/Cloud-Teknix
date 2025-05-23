require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.APP_PORT || 2001;
const host = "0.0.0.0";
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const tokenCheck = require("./middlewares/token-check");

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

server.get("/", (req, res) => {
  try {
    res.json({
      status: true,
      message: "It Works",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
});

const routePath = path.join(__dirname, "routes");
fs.readdirSync(routePath).forEach((routeFile) => {
  const filePath = path.join(routePath, routeFile);
  if (fs.statSync(filePath).isFile() && routeFile.endsWith(".js")) {
    const routeName = path.parse(routeFile).name;
    const route = require(filePath);

    server.use(`/${routeName}`, tokenCheck, route);
  }
});

server.listen(port, host, () => {
  console.log(`App running on http://${host}:${port}`);
});
