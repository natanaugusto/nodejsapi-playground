import express from 'express'
import User from '../models/user.model'

const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async (req, res, next) => {
  const {name, email, password} = req.body
  if (password !== req.body.confirmPassword) {
    res.status(403).json({error: 'The password not match'})
  }

  const user = new User({name, email, password})
  try {
    await user.save()
    res.json({name, email})
  } catch (e) {
    next(e)
  }
})

export default router
