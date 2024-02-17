require("dotenv").config();
const mail = require("nodemailer");
const { MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM } =
  process.env;
const Yup = require("yup");

const transporter = mail.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

const mailConfig = {
  from: `"${MAIL_FROM}" <${MAIL_USERNAME}>`,
};

const sendValidation = Yup.object({
  recipient: Yup.string().email().required("Penerima email tidak boleh kosong"),
  subject: Yup.string().required("Subject email tidak boleh kosong"),
  message: Yup.string().required("Isi pesan email tidak boleh kosong"),
});

const mailer = {
  mailSender: async (req, res) => {
    try {
      const requestBody = req.body;
      const validation = await sendValidation.validate(requestBody);

      const sendOtp = await transporter.sendMail({
        ...mailConfig,
        to: validation.recipient,
        subject: validation.subject,
        html: validation.message,
      });

      res.json({
        status: true,
        message: `Pesan terkirim: ${sendOtp?.messageId}`,
      });
    } catch (error) {
      if (error?.name === "ValidationError") {
        res.status(400).json({
          status: false,
          error: error?.message,
        });
      } else {
        res.status(500).json({
          status: false,
          error: error?.message,
        });
      }
    }
  },
};

module.exports = mailer;
