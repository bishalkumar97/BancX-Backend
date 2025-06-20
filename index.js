// Test V1
// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const dotenv = require('dotenv')

// // Load environment variables
// dotenv.config()

// const contactRoute = require('./routes/contact')
// const subscribeRoute = require('./routes/subscribe')

// const app = express()
// const PORT = process.env.PORT || 4000

// // ✅ Allow all origins using cors middleware
// app.use(cors())

// // ✅ Manual CORS headers to fix preflight (OPTIONS) handling on Vercel
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*') // Allow all origins
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') // Allow these methods
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type') // Allow this header
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end() // Quickly respond to preflight
//   }
//   next()
// })

// // Body parser
// app.use(express.json())

// // Routes
// app.use('/api/contact', contactRoute)
// app.use('/api/subscribe', subscribeRoute)

// // Debug: Show SMTP config
// console.log('SMTP CONFIG DEBUG:', {
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   user: process.env.SMTP_USER
// })

// // Connect MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected')
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
//   })
//   .catch(err => console.error('MongoDB error:', err))

//Test V2
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

// Load environment variables from .env
dotenv.config()

// Import routes
const contactRoute = require('./routes/contact')
const subscribeRoute = require('./routes/subscribe')

// Initialize Express
const app = express()
const PORT = process.env.PORT || 4000

// ✅ Enable CORS (safer and future-proof)
app.use(cors({
  origin: '*', // You can replace '*' with your frontend domain for more security
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}))

// ✅ Handle OPTIONS preflight for all routes
app.options('*', cors())

// ✅ Parse incoming JSON
app.use(express.json())

// ✅ API Routes
app.use('/api/contact', contactRoute)
app.use('/api/subscribe', subscribeRoute)

// ✅ Debug your SMTP config
console.log('SMTP CONFIG DEBUG:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER
})

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  })
