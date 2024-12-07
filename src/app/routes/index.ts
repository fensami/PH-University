import { Router } from "express";
import { StudentRoutes } from "../modules/students/student.route";
import { userRouters } from "../modules/user/user.route";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRouters } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepermentRouters } from "../modules/academicDeperment/academicDeperment.route";



const router = Router()


const moudulesRoute = [
    {
        path: "/users",
        route: userRouters
    },
    {
        path: "/students",
        route: StudentRoutes
    },
    {
        path: "/academic-semesters",
        route: academicSemesterRoutes
    },
    {
        path: "/academic-faculties",
        route: academicFacultyRouters
    },
    {
        path: "/academic-deperment",
        route: academicDepermentRouters
    }
]

moudulesRoute.forEach((route) => router.use(route.path, route.route));


export default router