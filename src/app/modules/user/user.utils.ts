import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";




const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        {
            role: "student"
        },
        {
            id: 1,
            _id: 0
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean()
    //203001 0001
    return lastStudent?.id ? lastStudent.id : undefined;
}


// year semester code 4 digit number
export const generatedStudentId = async (payload: TAcademicSemester) => {

    // console.log(await findLastStudentId());

    let currentId = (0).toString() // 0000 by default value

    const lastStudentId = await findLastStudentId()
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01
    const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
    const currentSemesterCode = payload.code;
    const currentYear = payload.year


    if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear) {
        currentId = lastStudentId.substring(6)
    }



    // let incrementId = parseInt(currentId) + 1
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0")


    incrementId = `${payload.year}${payload.code}${incrementId}`;

    return incrementId

}