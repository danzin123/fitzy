import { Router } from 'express';
import { TrainingController } from '../presentation/controllers/training.controller.js';
import { requireAuth, requireRole } from '../infrastructure/http/middlewares/auth.middleware.js';

const router = Router();
const trainingController = new TrainingController();

// Protected routes (Require Authentication)
router.use(requireAuth);

// Create a new training (Only Trainers can create)
router.post(
  '/', 
  requireRole(['trainer']), 
  trainingController.createTraining.bind(trainingController)
);

// Find nearby trainers (Students can search)
router.get(
  '/nearby-trainers',
  requireRole(['student', 'trainer']),
  trainingController.findNearbyTrainers.bind(trainingController)
);

export default router;
