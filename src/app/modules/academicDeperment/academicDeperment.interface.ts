import { Types } from "mongoose"

export type TAcademicDeperment = {
    name: string
    academicFaculty: Types.ObjectId
}