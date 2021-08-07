import { Router } from 'express'
const router = Router()

router.get('/api/test', (req, res) => {
  res.send('testing success')
})

export default router
