// const { sendEmail } = require('../utils/mailer')

// exports.handleContact = async (req, res) => {
//   const { name, email, message } = req.body
//   if (!name || !email || !message) {
//     return res.status(400).json({ error: 'All fields are required.' })
//   }
//   try {
//     await sendEmail({
//       to: process.env.SMTP_USER,
//       subject: `New Contact from ${name}`,
//       html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`
//     })
//     res.status(200).json({ message: 'Message sent successfully.' })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Failed to send email.' })
//   }
// }

const nodemailer = require('nodemailer');

exports.handleContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Email config
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_USER, // receiving mail
      subject: 'New Contact Form Submission',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
};
