import QueryBuilder from "../../builder/QueryBuilders";
import AppError from "../../errors/AappErrors";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { RagistraitonStatus } from "./semesterRagistration.constant";
import { TSemesterRegistration } from "./semesterRagistration.interface";
import { SemesterRagistration } from "./semesterRagistration.model";


const createSemesterRagistrationIntoDB = async (payload: TSemesterRegistration) => {

    const academicSemester = payload?.academicSemester

    // check if there any registered semester that is already 'UPCOMING' | 'ONGOING'
    const isThereAnyUpcomingOrOngoingSemester = await SemesterRagistration.findOne({
        $or: [
            { status: RagistraitonStatus.UPCOMING },
            { status: RagistraitonStatus.ONGOING }
        ]
    })

    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(404, `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} registered Semester`)
    }



    // check if the semester is exists
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester)

    if (!isAcademicSemesterExists) {
        throw new AppError(404, "This academic semester not found")
    }
    // check if the semester is already registered
    // const isSemesterRagistrationExists = await SemesterRagistration.findOne({ academicSemester })
    // if (isSemesterRagistrationExists) {
    //     throw new AppError(409, "This semester already exists")
    // }


    const result = await SemesterRagistration.create(payload);
    return result

}
const getAllSemesterRagistrationFromDB = async (query: Record<string, unknown>) => {

    const semesterRagistrationQuery = new QueryBuilder(SemesterRagistration.find().populate('academicSemester'), query).filter().sort().paginate().fields();


    const result = await semesterRagistrationQuery.modelQuery;
    return result

}

const getSingleSemesterRagistrationFromDB = async (id: string) => {
    const result = await SemesterRagistration.findById(id).populate("academicSemester");
    return result
}

const updateSemesterRagistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {


    // check if the requiested registered semester is exists
    const isAcademicSemesterExists = await SemesterRagistration.findById(id)

    if (!isAcademicSemesterExists) {
        throw new AppError(404, "This semester not found")
    }
    // check if the semester is already registered
    // const isSemesterRagistrationExists = await SemesterRagistration.findOne({ academicSemester })
    // if (isSemesterRagistrationExists) {
    //     throw new AppError(409, "This semester already exists")
    // }

    // if the requested semester registration is ended , we will not update anything

    // const requestedSemester = await SemesterRagistration.findById(id,);
    const currentSemesterStatus = await isAcademicSemesterExists?.status;
    const requistStatus = payload?.status


    if (currentSemesterStatus === RagistraitonStatus.ENDED) {
        throw new AppError(404, `this semester is already ${currentSemesterStatus}`)
    }

    // UPCOMING -->> ONGOING  -->> ENDED
    if (currentSemesterStatus === RagistraitonStatus.UPCOMING && requistStatus === RagistraitonStatus.ENDED) {
        throw new AppError(404, `You can not directly changed status from ${currentSemesterStatus} to ${requistStatus}`)
    }
    if (currentSemesterStatus === RagistraitonStatus.ONGOING && requistStatus === RagistraitonStatus.UPCOMING) {
        throw new AppError(404, `You can not directly changed status from ${currentSemesterStatus} to ${requistStatus}`)
    }


    const result = await SemesterRagistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })
    return result
};

const deleteSemesterRagistrationFromDB = async () => {

};





export const SemesterRagistrationServices = {
    createSemesterRagistrationIntoDB,
    getAllSemesterRagistrationFromDB,
    getSingleSemesterRagistrationFromDB,
    updateSemesterRagistrationIntoDB,
    deleteSemesterRagistrationFromDB
}