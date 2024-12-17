import QueryBuilder from "../../builder/QueryBuilders";
import AppError from "../../errors/AappErrors";
import { AcademicDeperment } from "../academicDeperment/academicDeperment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRagistration } from "../semesterRagistration/semesterRagistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { hasTimeConfilct } from "./offeredCourse.utils";


const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        faculty,
        section,
        days,
        startTime,
        endTime } = payload
    // Check if the academic semester exists
    const isSemesterRegistrationExists = await SemesterRagistration.findById(semesterRegistration)

    if (!isSemesterRegistrationExists) {
        throw new AppError(404, "Semester Registration is not found")
    }

    // Check Academic Semester 
    const academicSemester = isSemesterRegistrationExists.academicSemester


    // Check if the academic Faculty exists
    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty)

    if (!isAcademicFacultyExists) {
        throw new AppError(404, "Academic Faculty is not found")
    }
    // Check if the academic Deperment exists
    const isAcademicDepermentExists = await AcademicDeperment.findById(academicDepartment)

    if (!isAcademicDepermentExists) {
        throw new AppError(404, "Academic Deperment is not found")
    }
    // Check if the couse exists
    const isCouseExists = await Course.findById(course)

    if (!isCouseExists) {
        throw new AppError(404, "Course is not found")
    }
    // Check if the couse exists
    const isFacultyExists = await Faculty.findById(faculty)

    if (!isFacultyExists) {
        throw new AppError(404, "Faculty is not found")
    }

    // check if the deperment is belong to the faculty
    const isDepermentBelongToFaculty = await AcademicDeperment.findOne({
        _id: academicDepartment,
        academicFaculty
    })

    if (!isDepermentBelongToFaculty) {
        throw new AppError(404, `This ${isAcademicDepermentExists.name} is not belong to this ${isAcademicFacultyExists.name}`)
    }

    // check if the same offered couse same section in the same registered semester exists
    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
        semesterRegistration,
        course,
        section
    })
    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new AppError(404, `Offered Course with same section is already exists !`)
    }

    // Get Schedules Of the Faculties
    const assignedSchedule = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select("days startTime endTime")

    console.log(assignedSchedule);
    const newSchedule = {
        days,
        startTime,
        endTime
    }

    if (hasTimeConfilct(assignedSchedule, newSchedule)) {
        throw new AppError(404, `This Faculty is not available at that time ! choose other time or days`)

    }


    const result = await OfferedCourse.create({ ...payload, academicSemester })

    return result
    // return null
};





const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
    const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await offeredCourseQuery.modelQuery;
    return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
    const offeredCourse = await OfferedCourse.findById(id);

    if (!offeredCourse) {
        throw new AppError(404, 'Offered Course not found');
    }

    return offeredCourse;
};

const updateOfferedCourseIntoDB = async (id: string, payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">) => {

    const { faculty, days, startTime, endTime } = payload;

    const isOfferedCourseExists = await OfferedCourse.findById(id);

    if (!isOfferedCourseExists) {
        throw new AppError(404, 'Offered Course not found');
    }
    const isFacultyExists = await Faculty.findById(faculty);

    if (!isFacultyExists) {
        throw new AppError(404, 'Faculty not found');
    }

    const semesterRegistration = isOfferedCourseExists.semesterRegistration

    const semesterRagistrationStatus = await SemesterRagistration.findById(semesterRegistration)
    if (semesterRagistrationStatus?.status !== "UPCOMING") {
        throw new AppError(404, `You Can Not Update this offered course as it is ${semesterRagistrationStatus?.status}`);

    }
    // Get Schedules Of the Faculties
    const assignedSchedule = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select("days startTime endTime")

    console.log(assignedSchedule);
    const newSchedule = {
        days,
        startTime,
        endTime
    }

    if (hasTimeConfilct(assignedSchedule, newSchedule)) {
        throw new AppError(404, `This Faculty is not available at that time ! choose other time or days`)

    }

    const result = await OfferedCourse.findByIdAndUpdate(id,
        payload, {
        new: true
    }
    )

};

const deleteOfferedCourseFromDB = async (id: string) => { };

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    deleteOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
};