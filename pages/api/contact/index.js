import FormData from "form-data";
import Mailgun from "mailgun.js";

const API_KEY = process.env.MAILGUN_API_KEY || "";
const DOMAIN = process.env.MAILGUN_DOMAIN || "";

const handler = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (req.method == "POST") {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: API_KEY,
    });

    const messageData = {
      from: `Contact Form ${process.env.EMAIL_DOMAIN}`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Form",
      text: `Hello,
      
    You have a new form entry from: ${name} ${email},
      
    ${subject}
    ${message}`,
    };
    try {
      const emailResponse = await mg.messages.create(DOMAIN, messageData);
      res.status(201).json("Email sent succesfully");
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err });
    }
  }
};

export default handler;