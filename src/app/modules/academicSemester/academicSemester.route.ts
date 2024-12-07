import express from "express"
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemisterValidations } from "./academicSemester.validation";

const router = express.Router();

router.post("/create-academic-semester", validateRequest(academicSemisterValidations.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)
router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester)
router.patch('/:semesterId', validateRequest(academicSemisterValidations.updateAcademicSemesterValidationSchema), AcademicSemesterControllers.updateSingleAcademicSemester)
router.get("/", AcademicSemesterControllers.getAllAcademicSemesters)


export const academicSemesterRoutes = router;
