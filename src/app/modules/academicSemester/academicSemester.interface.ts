import { TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.constant"

export type TAcademicSemester = {
    name: TAcademicSemesterName
    code: TAcademicSemesterCode
    year: String
    startMonth: TMonths
    endMonth: TMonths

}

//Semester name --> semester code
export type TAcademicSemesterNameCodeMapper = {
    [key: string]: string;
}