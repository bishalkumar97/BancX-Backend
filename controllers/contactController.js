const { sendEmail } = require('../utils/mailer')

exports.handleContact = async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }
  try {
    await sendEmail({
      to: process.env.SMTP_USER,
      subject: `New Contact from ${name}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`
    })
    res.status(200).json({ message: 'Message sent successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to send email.' })
  }
}