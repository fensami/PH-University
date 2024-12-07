import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFacult.controller";

const router = express.Router()




router.post('/create-academic-faculty', validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),
    AcademicFacultyControllers.createAcademicFaculty);
router.get('/:facultyId',
    AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch('/:facultyId', validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),
    AcademicFacultyControllers.updateSingleAcademicFaculty);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculty)


export const academicFacultyRouters = router;