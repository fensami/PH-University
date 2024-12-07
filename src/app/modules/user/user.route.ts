import express from "express";
import { userControllers } from "./user.controller";
import { createStudentValidationSchema } from "../students/student.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router()




router.post('/create-student', validateRequest(createStudentValidationSchema), userControllers.createStudent)


export const userRouters = router;