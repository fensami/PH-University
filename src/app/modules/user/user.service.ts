import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.inderface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/AappErrors";
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDeperment } from "../academicDeperment/academicDeperment.model";
import { Faculty } from "../faculty/faculty.model";
import { Admin } from "../admin/admin.model";
import QueryBuilder from "../../builder/QueryBuilders";

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

        userData.id = await generateStudentId(admissionSemester);
        // if (!academicDepartment) {
        //     throw new AppError(400, 'Academic department not found');
        // }
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


// create Faculty into DB
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);

    //set student role
    userData.role = 'faculty';

    // find academic department info
    const academicDepartment = await AcademicDeperment.findById(
        payload.academicDepartment,
    );
    // AcademicDeperment

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session }); // array

        //create a faculty
        if (!newUser.length) {
            throw new AppError(404, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a faculty (transaction-2)

        const newFaculty = await Faculty.create([payload], { session });

        if (!newFaculty.length) {
            throw new AppError(404, 'Failed to create faculty');
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};


// create admin into db
const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {}

    // if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);

    //set Admin role
    userData.role = 'admin';

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        //set generated id
        userData.id = await generatedAdminId();

        //create a user (transaction-1)
        const newUser = await User.create([userData], { session });

        // care a admin
        if (!newUser.length) {
            throw new AppError(404, 'failed to create admin')
        }

        // set id , _id as user 

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        //create a admin (transaction-2)
        const newAdmin = await Admin.create([payload], { session });

        if (!newAdmin.length) {
            throw new AppError(404, 'failed to create admin')
        }

        await session.commitTransaction();
        await session.endSession()

        return newAdmin;

    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err)
    }

}
const getAllUserFromDb = async (query: Record<string, unknown>) => {
    const usersQuery = new QueryBuilder(User.find(), query);

    const result = await usersQuery.modelQuery
    return result

}


export const UserService = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
    getAllUserFromDb
}