import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";

const router = express.Router()




router.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourse);
router.patch('/:id', validateRequest(CourseValidations.updateCourseValidationSchema), CourseControllers.updateCourse)
router.get('/:id', CourseControllers.getSingleCourses)
router.put('/:courseId/assign-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.assignFacultiesWithCourse)
router.delete('/:courseId/remove-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.removeFacultiesFromCourse)

router.delete('/:id', CourseControllers.deleteCourse)

router.get('/', CourseControllers.getAllCourses)


export const CourseRouters = router;