import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilders";
import { courseSearchAbleField } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model"
import AppError from "../../errors/AappErrors";

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);

    return result;
}


const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
        .search(courseSearchAbleField)
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await courseQuery.modelQuery;

    return result;
}

const getSingleCoursesFromDB = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {

    const { preRequisiteCourses, ...CourseRemaningData } = payload;


    const session = await mongoose.startSession();


    try {
        session.startTransaction()


        //step:1 basic course info update

        const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
            id,
            CourseRemaningData,
            {
                new: true,
                runValidators: true,
                session
            }
        )
        if (!updatedBasicCourseInfo) {
            throw new AppError(404, "failed to updated Course")
        }

        // if there is any pre requisite courses to update
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            //filter out the deleted fields
            const deletedPreRequisites = preRequisiteCourses.filter((el) => el.course && el.isDeleted).map((ele) => ele.course);

            console.log(deletedPreRequisites);

            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
                $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } }
            }, {
                session,
                new: true,
                runValidators: true,
            })
            if (!deletedPreRequisiteCourses) {
                throw new AppError(404, "failed to delete Course")
            }

            //filter out the New course fields

            const newPreRequisites = preRequisiteCourses?.filter((el) => el.course && !el.isDeleted)

            const newPreRequisiteCourses = await Course.findByIdAndUpdate(
                id, {
                $addToSet: { preRequisiteCourses: { $each: newPreRequisites } }

            }, {
                session,
                new: true,
                runValidators: true,
            }
            )
            if (!newPreRequisiteCourses) {
                throw new AppError(404, "failed to new preRequisite Course")
            }

            // console.log({ newPreRequisiteCourses, });

            const result = await Course.findById(id).populate('preRequisiteCourses.course')

            return result
        }
        await session.commitTransaction();
        await session.endSession()
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession()
        throw new AppError(404, "failed to updated Course")
    }



    // const result = await Course.findByIdAndUpdate()
}


const deleteCoursesFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
}

const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {

    const result = CourseFaculty.findByIdAndUpdate(id,
        { course: id, $addToSet: { faculties: { $each: payload } } },
        { upsert: true, new: true }
    )

    return result
}
const removeFacultiesFromCourseFromDB = async (id: string, payload: Partial<TCourseFaculty>) => {

    const result = CourseFaculty.findByIdAndUpdate(id,
        {
            $pull: { faculties: { $in: payload } }
        },
        { upsert: true, new: true }
    )

    return result
}


export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCoursesFromDB,
    updateCourseIntoDB,
    deleteCoursesFromDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesFromCourseFromDB
}