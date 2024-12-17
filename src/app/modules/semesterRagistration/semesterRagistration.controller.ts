import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRagistrationServices } from "./semesterRagistration.services";

const createSemesterRagistration = catchAsync(async (req, res) => {
    const result = await SemesterRagistrationServices.createSemesterRagistrationIntoDB(req.body);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: 'Semester Ragistration succesfully',
        data: result,
    });
});
const getAllSemesterRagistrations = catchAsync(async (req, res) => {
    const result = await SemesterRagistrationServices.getAllSemesterRagistrationFromDB(req.query);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: 'Semester Registration are retrieved succesfully',
        data: result,
    });
});

const getSingleSemesterRagistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRagistrationServices.getSingleSemesterRagistrationFromDB(id);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: 'Semester Registration is retrieved succesfully',
        data: result,
    });
});
const updateSemesterRagistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRagistrationServices.updateSemesterRagistrationIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: 'Semester Ragistration is updated succesfully',
        data: result,
    });
});

// const deleteFaculty = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const result = await FacultyServices.deleteFacultyFromDB(id);

//     sendResponse(res, {
//         statusCode: 500,
//         success: true,
//         message: 'Faculty is deleted succesfully',
//         data: result,
//     });
// });

export const SemesterRagistrationControllers = {
    createSemesterRagistration,
    getAllSemesterRagistrations,
    getSingleSemesterRagistration,
    updateSemesterRagistration
}