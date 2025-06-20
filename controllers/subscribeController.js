const Subscription = require('../models/Subscription')
const { sendEmail } = require('../utils/mailer')

exports.handleSubscribe = async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email is required.' })
  try {
    const exists = await Subscription.findOne({ email })
    if (exists) return res.status(409).json({ message: 'Subscription already exists.' })

    await Subscription.create({ email })
    await sendEmail({
      to: process.env.SMTP_USER,
      subject: 'New Subscription',
      html: `<p>New newsletter subscription from: ${email}</p>`
    })
    res.status(201).json({ message: 'Subscribed successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to subscribe.' })
  }
}