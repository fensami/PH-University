// import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from 'express';



const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentsFromDB(studentId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });

})

const getAllStudents = catchAsync(async (req, res) => {

  // console.log(req.query);

  const result = await StudentServices.getAllStudentsFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'student are rerieved successfully',
    data: result,
  });

})

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentsIntoDB(studentId, student);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "student is updated kaku successfully",
    data: result
  })
})

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "student is deleted successfully",
    data: result
  })
})



export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
