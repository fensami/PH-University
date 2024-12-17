import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res,) => {

    const { password, student: studentData } = req.body;
    // const zodParseData = studentValidationSchema.parse(studentData);
    const result = await UserService.createStudentIntoDB(password, studentData)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "student is created successfully",
        data: result
    })

})

const createFaculty = catchAsync(async (req, res) => {
    const { passsword, faculty: facultyData } = req.body;

    const result = await UserService.createFacultyIntoDB(passsword, facultyData);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: "faculty is created succesfully",
        data: result
    })
})

const createAdmin = catchAsync(async (req, res) => {
    const { passsword, admin: adminData } = req.body;

    const result = await UserService.createAdminIntoDB(passsword, adminData);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: "Admin is created Succesfully",
        data: result
    })
})
const getAllUsers = catchAsync(async (req, res) => {
    // const { passsword, admin: adminData } = req.body;

    const result = await UserService.getAllUserFromDb(req.query);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: "All Users Showing Succesfully",
        data: result
    })
})


export const userControllers = {
    createStudent,
    createFaculty,
    createAdmin,
    getAllUsers
}