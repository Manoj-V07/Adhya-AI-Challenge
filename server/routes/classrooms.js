import express from 'express'
// import { getClassroomById, listenToClassroomUpdates } from '../firebase.js' // Placeholder for Firebase

const router = express.Router()

// Get classroom data by ID
router.get('/:id', async (req, res) => {
  const classroomId = req.params.id
  // const classroomData = await getClassroomById(classroomId)
  // Simulate classroom data for now
  const classroomData = {
    id: classroomId,
    name: 'Sample Classroom',
    students: [],
    devices: [],
    // ...other classroom info
  }
  res.json(classroomData)
})

// (Optional) Real-time updates via Server-Sent Events (SSE)
router.get('/:id/stream', (req, res) => {
  const classroomId = req.params.id
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })
  res.flushHeaders()

  // Placeholder: send a dummy update every 5 seconds
  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ classroomId, updated: new Date() })}\n\n`)
  }, 5000)

  req.on('close', () => {
    clearInterval(interval)
    res.end()
  })
})

export default router