import FormData from "form-data";
import Mailgun from "mailgun.js";

const API_KEY = process.env.MAILGUN_API_KEY || "";
const DOMAIN = process.env.MAILGUN_DOMAIN || "";
//console.log('domain: ', DOMAIN);
const handler = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: API_KEY,
  });

  const messageData = {
    from: "Contact Form <mailgun@sandbox6208b957a90d4c338a1414040f0aaec6.mailgun.org>",
    to: "buchi@buchidevv.com",
    subject: "New Contact Form",
    text: `Hello,
    
    You have a new form entry from: ${name} ${email},
    
    ${subject}
    ${message}`,
    //   html: "<h1>Testing some Mailgun awesomeness!</h1>,
  };
  // console.log(`${name} ${email}, ${subject} ${message}`);

  try {
    const emailResponse = await mg.messages.create(DOMAIN, messageData);
    //console.log(emailResponse);
    res.status(201).json('Email sent succesfully');
  } catch (err) {
    console.error(err);
    res.status(400).json({'error': err});
  }

  // if (req.method == "POST") {
  //   try {
  //     res
  //       .status(201)
  //       .json({
  //         "Received form data": `${name} ${email} ${subject} ${message}`,
  //       });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }
};

export default handler;