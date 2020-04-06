import express from 'express'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'

const JWTSECRET = process.env.JWTSECRET || 'somejwtsecret'

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

router.post('/signin', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    res.status(401).json({ status: 'User not foud' })
  }

  user.comparePassword(req.body.password, (err, isMatch) => {
    if (isMatch) {
      const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
      const token = jwt.sign({ id: user.id, exp }, JWTSECRET)
      const {id, name} = user
      res.status(200).json({
        id, token
      })
    } else {
      res.status(401).json({ status: 'Error' })
    }
  })
})

export default router
