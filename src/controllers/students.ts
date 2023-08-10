import { Request, Response } from 'express'
import { StudentSchema } from '../db/mongo'

const getAllStudents = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query
  const pageNumber = Number(page)
  const limitNumber = Number(limit)

  try {
    let query = StudentSchema.find()

    if (Object.keys(req.query).length === 0) {
      const students = await query.exec()
      res.status(200).json(students)
    } else if (pageNumber && limitNumber) {
      const totalStudents = await StudentSchema.countDocuments()
      const totalPages = Math.ceil(totalStudents / limitNumber)

      const students = await query.limit(limitNumber).skip(limitNumber * (pageNumber - 1))

      res.status(200).json({
        data: students,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          totalPages: totalPages
        }
      })
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching students' })
  }
}

const getStudentById = async (req: Request, res: Response) => {
  const { studentId } = req.params
  try {
    const student = await StudentSchema.findOne({ _id: studentId })
    res.status(200).json(student)
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching student' })
  }
}

export { getAllStudents, getStudentById }
