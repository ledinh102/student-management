import express from 'express'
import { getAllStudents, getStudentById } from '../controllers/students'

const studentsRouter = express.Router()

studentsRouter.get('/', getAllStudents)
studentsRouter.get('/:studentId', getStudentById)
export default studentsRouter
