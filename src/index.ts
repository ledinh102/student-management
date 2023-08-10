import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import studentsRouter from './routes/students'

const app: Express = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/students', studentsRouter)

app.listen(5000, () => {
  console.log('Server running on Port: ' + 5000)
})

export default app
