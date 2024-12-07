import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepermentServices } from "./academicDeperment.service";

const createAcademiDeperment = catchAsync(async (req, res,) => {

    const result = await AcademicDepermentServices.createAcademicDeparmentIntoDb(req.body)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Deperment is created successfully",
        data: result
    })

})
const getAllAcademiDeperments = catchAsync(async (req, res,) => {

    const result = await AcademicDepermentServices.getAllAcademicDepermentFromDb();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Deperments are retrived successfully",
        data: result
    })

})

const getSingleAcademiDeperments = catchAsync(async (req, res,) => {
    const { depermentId } = req.params;
    const result = await AcademicDepermentServices.getSingleAcademiDepermentFromDb(depermentId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Deperment is retrived successfully",
        data: result
    })

})
const updateSingleAcademiDeperment = catchAsync(async (req, res,) => {
    const { depermentId } = req.params;
    const result = await AcademicDepermentServices.updateSingleAcademiDepermentIntoDb(depermentId, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Deperment is update successfully",
        data: result
    })

})


export const AcademicDepermentControllers = {
    createAcademiDeperment,
    getAllAcademiDeperments,
    getSingleAcademiDeperments,
    updateSingleAcademiDeperment
}