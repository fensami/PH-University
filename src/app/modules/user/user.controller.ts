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


export const userControllers = {
    createStudent
}