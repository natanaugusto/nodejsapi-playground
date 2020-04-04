import express from 'express'
import path from 'path'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import datasourceConnect from './datasource'

import indexRouter from './routes/index'
import usersRouter from './routes/users'

const app = express()
datasourceConnect()

app.use(logger('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))
app.use(cors())
app.use(helmet())

app.use('/', indexRouter)
app.use('/users', usersRouter)

export default app
