import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import studentsRouter from './routes/students'

const app: Express = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/students', studentsRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('Server running on Port: ' + PORT)
})

export default app
