import express from 'express';
import { SemesterRagistrationControllers } from './semesterRagistration.controller';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRagistrationValidations } from './semesterRagistration.validation';





const router = express.Router();

router.post('/create-semesterRagistration', validateRequest(semesterRagistrationValidations.createSemesterRagistrationValidation), SemesterRagistrationControllers.createSemesterRagistration);
router.patch('/:id', validateRequest(semesterRagistrationValidations.updateSemesterRagistrationValidation), SemesterRagistrationControllers.updateSemesterRagistration);
router.get('/:id', SemesterRagistrationControllers.getSingleSemesterRagistration);
router.get('/', SemesterRagistrationControllers.getAllSemesterRagistrations);

export const SemesterRagistrationRoutes = router;