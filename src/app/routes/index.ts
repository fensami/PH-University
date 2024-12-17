import { Router } from "express";
import { StudentRoutes } from "../modules/students/student.route";
import { userRouters } from "../modules/user/user.route";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRouters } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepermentRouters } from "../modules/academicDeperment/academicDeperment.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { CourseRouters } from "../modules/course/course.route";
import { SemesterRagistrationRoutes } from "../modules/semesterRagistration/semesterRagistration.rotues";
import { offeredCourseRoutes } from "../modules/offeredCourse/offeredCourse.routes";
import { AuthRoutes } from "../modules/auth/auth.route";



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
    },
    {
        path: "/faculties",
        route: FacultyRoutes
    },
    {
        path: "/courses",
        route: CourseRouters
    },
    {
        path: "/semester-ragistrations",
        route: SemesterRagistrationRoutes
    },
    {
        path: "/offeredCourses",
        route: offeredCourseRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    }
]

moudulesRoute.forEach((route) => router.use(route.path, route.route));


export default router