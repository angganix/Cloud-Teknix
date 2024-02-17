const router = require("express").Router();
const mailer = require("../functions/mailer");

router.post("/send", mailer.mailSender);

module.exports = router;
