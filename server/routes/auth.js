import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import { createUser, getUserByEmail } from '../firebase.js' // Placeholder for Firebase integration

const router = express.Router()

// Signup endpoint
router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields required' })
  }
  // const existingUser = await getUserByEmail(email)
  // if (existingUser) return res.status(409).json({ message: 'User exists' })

  const hashedPassword = await bcrypt.hash(password, 10)
  // await createUser({ email, password: hashedPassword, role })

  // Simulate user creation for now
  const user = { email, role }

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.status(201).json({ token, user })
})

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields required' })
  }
  // const user = await getUserByEmail(email)
  // if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  // Simulate user for now
  const user = { email, password: '$2a$10$fakehash', role: 'user' }
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' })

  const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.json({ token, user: { email: user.email, role: user.role } })
})

export default router