import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepermentValidation } from "./academicDeperment.validation";
import { AcademicDepermentControllers } from "./academicDeperment.controller";

const router = express.Router()




router.post('/create-academic-deperment', validateRequest(AcademicDepermentValidation.createAcademicDepermentValidationSchema), AcademicDepermentControllers.createAcademiDeperment)

router.get('/:depermentId', AcademicDepermentControllers.getSingleAcademiDeperments)
router.patch('/:depermentId', validateRequest(AcademicDepermentValidation.updateAcademicDepermentValidationSchema), AcademicDepermentControllers.updateSingleAcademiDeperment)


router.get('/', AcademicDepermentControllers.getAllAcademiDeperments)


export const academicDepermentRouters = router;