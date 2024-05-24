const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/subscribe", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "cimeranaidoo@gmail.com",
      pass: "Cimi0204.",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "cimeranaidoo@gmail.com",
    subject: "New Subscription",
    text: `New subscription from: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Email sent successfully");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
