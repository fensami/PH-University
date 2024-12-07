import { TAcademicDeperment } from "./academicDeperment.interface";
import { AcademicDeperment } from "./academicDeperment.model";

const createAcademicDeparmentIntoDb = async (payload: TAcademicDeperment) => {
    const result = await AcademicDeperment.create(payload);
    return result
}
const getAllAcademicDepermentFromDb = async () => {
    const result = await AcademicDeperment.find().populate("academicFaculty");
    return result;
}
const getSingleAcademiDepermentFromDb = async (id: string) => {
    const result = await AcademicDeperment.findById(id).populate("academicFaculty")
    return result
}
const updateSingleAcademiDepermentIntoDb = async (id: string, payload: Partial<TAcademicDeperment>) => {
    const result = await AcademicDeperment.findOneAndUpdate({ _id: id }, payload, { new: true })
    return result
}
export const AcademicDepermentServices = {
    createAcademicDeparmentIntoDb,
    getAllAcademicDepermentFromDb,
    getSingleAcademiDepermentFromDb,
    updateSingleAcademiDepermentIntoDb
}