import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res,) => {

    const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(req.body)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty is created successfully",
        data: result
    })

})

const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDb();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculties are retrived successfully",
        data: result
    })
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDb(facultyId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty is retrived successfully",
        data: result
    })
})

const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params
    const result = await AcademicFacultyServices.updateSingleAcademicFacultyFromDb(facultyId, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty is updated successfully",
        data: result
    })
})




export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateSingleAcademicFaculty
}