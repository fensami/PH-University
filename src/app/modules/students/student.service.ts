import { build, object } from 'joi';
import { Student } from './student.model';
import { TStudent } from './student.inderface';
import mongoose from 'mongoose';
import AppError from '../../errors/AappErrors';
import { User } from '../user/user.model';



// Get Student info from DB
const getAllStudentsFromDB = async (query: Record<string, undefined>) => {

  const queryObj = { ...query }


  const studentSearchAbleField = ["email", "name.firstName", "name.middleName", "presentAddress"]
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string
  }

  const searchQuary = Student.find({
    $or: studentSearchAbleField.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' }
    }))
  })

  // filturing
  const excludeFields = ['searchTerm', 'sort', 'limit']

  excludeFields.forEach((el) => delete queryObj[el])
  console.log({ query, queryObj });


  const filtureQuary = searchQuary.find(queryObj).populate("admissionSemester")
    .populate({
      path: 'academicDeperment',
      populate: {
        path: "academicFaculty"
      }
    });

  let sort = '-createdAt'
  if (query.sort) {
    sort = query.sort as string
  }

  const sortQuary = filtureQuary.sort(sort)


  let limit = 1
  if (query.limit) {
    limit = query.limit
  }

  const limitQuary = await sortQuary.limit(limit)



  return limitQuary;
};
// Get signle Student info from DB
const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: 'academicDeperment',
      populate: {
        path: "academicFaculty"
      }
    });
  console.log(result);

  return result;
};
// update Student info into DB
const updateStudentsIntoDB = async (id: string, payload: Partial<TStudent>) => {

  const { name, guardian, localGuardian, ...remanningStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remanningStudentData

  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`gurdian.${key}`] = value
    }
  }

  if (localGuardian && Object) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }
  console.log(modifiedUpdatedData);



  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, { new: true, runValidators: true });
  return result;
};

const deleteStudentFromDb = async (id: string) => {


  const session = await mongoose.startSession();
  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(404, "failed to deleted student")
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(404, "failed to deleted student")
    }
    await session.commitTransaction()
    await session.endSession()


    return deletedStudent

  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(404, "failed to deleted student")
  }



}

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDb,
  updateStudentsIntoDB
};
