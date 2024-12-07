import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.inderface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedStudentId } from "./user.utils";
import AppError from "../../errors/AappErrors";

// Create Student info from DB
const createStudentIntoDB = async (password: string, payload: TStudent) => {
    // create a user object
    const userData: Partial<TUser> = {};
    // if password not given , use default password
    userData.password = password || (config.default_pass as string);


    // set student role
    userData.role = "student";


    // find academic semester info 
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);


    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        // Set Mennually generated id
        userData.id = await generatedStudentId(admissionSemester)
        // create a user (transection - 1)
        const newUser = await User.create([userData], { session }) // array

        // create a student
        if (!newUser.length) {
            throw new AppError(404, "Failed to create new user")

        }
        payload.id = newUser[0].id; // embeding id
        payload.user = newUser[0]._id; // reference _id

        // create a user (transection - 2)
        const newStudent = await Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError(404, "Failed to create new Student")
        }

        await session.commitTransaction();
        await session.endSession()
        return newStudent

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();


    }



};


export const UserService = {
    createStudentIntoDB
}