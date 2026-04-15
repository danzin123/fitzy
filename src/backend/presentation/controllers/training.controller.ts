import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../../infrastructure/db/prisma.js';
import { AuthenticatedRequest } from '../../infrastructure/http/middlewares/auth.middleware.js';

// Schema validation using Zod
const CreateTrainingSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  student_id: z.string().uuid().optional(),
  is_template: z.boolean().default(false),
  exercises: z.array(
    z.object({
      exercise_id: z.string().uuid(),
      sets: z.number().int().min(1),
      reps: z.string(),
      rest_seconds: z.number().int().min(0),
      order_index: z.number().int().min(0),
    })
  ).min(1),
});

export class TrainingController {
  /**
   * Creates a new training program (either a template or assigned to a student)
   */
  async createTraining(req: AuthenticatedRequest, res: Response) {
    try {
      const trainerId = req.user?.id;
      
      if (!trainerId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // 1. Validate input
      const parsedBody = CreateTrainingSchema.safeParse(req.body);
      
      if (!parsedBody.success) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: parsedBody.error.format() 
        });
      }

      const data = parsedBody.data;

      // 2. Execute Transaction (Create Training + Link Exercises)
      const newTraining = await prisma.$transaction(async (tx) => {
        // Create the base training record
        const training = await tx.training.create({
          data: {
            trainer_id: trainerId,
            student_id: data.student_id || null,
            name: data.name,
            description: data.description,
            is_template: data.is_template,
          },
        });

        // Link exercises to the training
        if (data.exercises.length > 0) {
          await tx.trainingExercise.createMany({
            data: data.exercises.map((ex) => ({
              training_id: training.id,
              exercise_id: ex.exercise_id,
              sets: ex.sets,
              reps: ex.reps,
              rest_seconds: ex.rest_seconds,
              order_index: ex.order_index,
            })),
          });
        }

        return training;
      });

      // 3. Return success response
      return res.status(201).json({
        message: 'Training created successfully',
        data: newTraining,
      });

    } catch (error) {
      console.error('[TrainingController.createTraining] Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Example of a PostGIS raw query for finding nearby trainers
   * This would typically be in a ProfileController, but placed here to demonstrate the requirement.
   */
  async findNearbyTrainers(req: AuthenticatedRequest, res: Response) {
    try {
      const { lat, lng, radius_km = 10 } = req.query;

      if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
      }

      // PostGIS ST_DWithin uses meters for Geography type
      const radiusMeters = Number(radius_km) * 1000;

      // Raw query to utilize PostGIS spatial index
      const nearbyTrainers = await prisma.$queryRaw`
        SELECT 
          p.id, 
          p.full_name, 
          p.specialties,
          ST_Distance(p.location, ST_MakePoint(${Number(lng)}, ${Number(lat)})::geography) as distance_meters
        FROM profiles p
        JOIN users u ON p.user_id = u.id
        WHERE u.role = 'trainer'
          AND ST_DWithin(
            p.location, 
            ST_MakePoint(${Number(lng)}, ${Number(lat)})::geography, 
            ${radiusMeters}
          )
        ORDER BY distance_meters ASC
        LIMIT 50;
      `;

      return res.status(200).json({ data: nearbyTrainers });
    } catch (error) {
      console.error('[TrainingController.findNearbyTrainers] Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
