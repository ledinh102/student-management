import { faker } from '@faker-js/faker/locale/en_US'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Student } from '../models'
dotenv.config()

const uri = process.env.URI || ''
mongoose
  .connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

const studentSchema = new mongoose.Schema<Student>({
  firstName: String,
  lastName: String,
  age: Number,
  mark: Number,
  city: String,
  avatar: String
})

const StudentSchema = mongoose.model('Student', studentSchema)

Array.from({ length: 100 }).forEach(async () => {
  const student = new StudentSchema({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.helpers.rangeToNumber({ min: 18, max: 25 }),
    city: faker.location.city(),
    mark: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
    avatar: faker.image.avatar()
  })
  await student.save()
})
// ;(async () => {
//   await StudentSchema.deleteMany({})
// })()

export { StudentSchema }
