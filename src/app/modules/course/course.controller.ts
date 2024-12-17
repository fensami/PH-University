import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";


const createCourse = catchAsync(async (req, res,) => {

    const result = await CourseServices.createCourseIntoDB(req.body)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "course is created successfully",
        data: result
    })

})

const getAllCourses = catchAsync(async (req, res) => {

    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: "Courses is retrived succesfully",
        data: result
    })
})
const getSingleCourses = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await CourseServices.getSingleCoursesFromDB(id);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: "Courses is retrived succesfully",
        data: result
    })
})


const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await CourseServices.updateCourseIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course is updated successfully",
        data: result
    })
})

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await CourseServices.deleteCoursesFromDB(id);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: "Courses is deleted succesfully",
        data: result
    })
})


const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(courseId, faculties);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: "Faculties assign succesfully",
        data: result
    })
})

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.removeFacultiesFromCourseFromDB(courseId, faculties);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: "Faculties removed succesfully",
        data: result
    })
})


export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourses,
    deleteCourse,
    updateCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse

}