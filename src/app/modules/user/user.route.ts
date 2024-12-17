import express from "express";
import { userControllers } from "./user.controller";
import { createStudentValidationSchema } from "../students/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { createFacultyValidationSchema, facultyValidations } from "../faculty/faculty.validation";
import { AdminValidations } from "../admin/admin.validation";

const router = express.Router()




router.post('/create-student', validateRequest(createStudentValidationSchema), userControllers.createStudent)

router.post('/create-faculty', validateRequest(facultyValidations.createFacultyValidationSchema), userControllers.createFaculty)
router.post('/create-admin', validateRequest(AdminValidations.createAdminValidationSchema), userControllers.createAdmin)
router.get('/', userControllers.getAllUsers);

export const userRouters = router;