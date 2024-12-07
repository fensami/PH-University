// import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res,) => {

    // const { password, student: studentData } = req.body;
    // const zodParseData = studentValidationSchema.parse(studentData);
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Semester is created successfully",
        data: result
    })

})

// get all
const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDb()
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Academic semesters are retrieved successfully',
        data: result,
    });
})
const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDb(
        semesterId)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Academic semesters are retrieved successfully',
        data: result,
    });
})

const updateSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params
    const result = await AcademicSemesterServices.updateSingleAcademicSemesterIntoDb(semesterId, req.body)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Academic semesters are retrieved successfully',
        data: result,
    });
})


export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateSingleAcademicSemester
}