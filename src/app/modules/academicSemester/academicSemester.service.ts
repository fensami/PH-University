import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {



    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid Semester code")

    }

    const result = await AcademicSemester.create(payload);
    return result

}

// get all semester
const getAllAcademicSemesterFromDb = async () => {
    const result = await AcademicSemester.find();
    return result
}
// get single semester
const getSingleAcademicSemesterFromDb = async (id: string) => {
    const result = await AcademicSemester.findById(id)
    return result
}
// update single semester 
const updateSingleAcademicSemesterIntoDb = async (id: string, payload: Partial<TAcademicSemester>) => {
    if (
        payload.name &&
        payload.code &&
        academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
        throw new Error("invalid Semester code")
    }
    const result = await AcademicSemester.findByIdAndUpdate({ _id: id }, payload, {
        new: true
    })
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDb,
    getSingleAcademicSemesterFromDb,
    updateSingleAcademicSemesterIntoDb
}