import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../../infrastructure/db/prisma.js';
import { AuthenticatedRequest } from '../../infrastructure/http/middlewares/auth.middleware.js';

// Validação dos dados de treino (Ajustado para o seu Schema)
const CreateTrainingSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  studentId: z.string().uuid().nullable().optional(),
  isTemplate: z.boolean().default(false),
  exercises: z.array(
    z.object({
      name: z.string().min(2),
      muscleGroup: z.string().optional(),
      sets: z.number().int().min(1),
      reps: z.string(),
      restTime: z.string().optional(),
      mediaUrl: z.string().url().optional(),
    })
  ).min(1),
});

export class TrainingController {
  /**
   * Busca estatísticas reais para o Dashboard (Métricas do Personal)
   */
  async getStats(req: AuthenticatedRequest, res: Response) {
    try {
      const personalId = req.user?.id;

      if (!personalId) {
        return res.status(401).json({ error: 'Não autorizado' });
      }

      // Executa as contagens em paralelo para performance
      const [totalStudents, totalTrainings] = await Promise.all([
        prisma.user.count({ 
          where: { 
            role: 'STUDENT',
            trainingsRec: { some: { personalId } } 
          } 
        }),
        prisma.training.count({ where: { personalId } })
      ]);

      return res.status(200).json({
        totalStudents,
        totalTrainings,
        activePlans: totalStudents,
        revenue: totalStudents * 150 // Valor simbólico de mensalidade
      });
    } catch (error) {
      console.error('[TrainingController.getStats] Error:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar estatísticas' });
    }
  }

  /**
   * Cria um novo programa de treino (Corrigido para camelCase e tabela Exercise)
   */
  async createTraining(req: AuthenticatedRequest, res: Response) {
    try {
      const personalId = req.user?.id;
      
      if (!personalId) {
        return res.status(401).json({ error: 'Não autorizado' });
      }

      const parsedBody = CreateTrainingSchema.safeParse(req.body);
      
      if (!parsedBody.success) {
        return res.status(400).json({ 
          error: 'Falha na validação', 
          details: parsedBody.error.format() 
        });
      }

      const data = parsedBody.data;

      const newTraining = await prisma.$transaction(async (tx) => {
        // 1. Cria o registro base do Treino
        const training = await tx.training.create({
          data: {
            personalId: personalId,
            studentId: data.studentId || null,
            title: data.title,
            description: data.description,
            isTemplate: data.isTemplate,
          },
        });

        // 2. Cria os exercícios vinculados diretamente (conforme seu Schema)
        if (data.exercises.length > 0) {
          await tx.exercise.createMany({
            data: data.exercises.map((ex) => ({
              trainingId: training.id,
              name: ex.name,
              muscleGroup: ex.muscleGroup,
              sets: ex.sets,
              reps: ex.reps,
              restTime: ex.restTime,
              mediaUrl: ex.mediaUrl,
            })),
          });
        }

        return training;
      });

      return res.status(201).json({
        message: 'Treino criado com sucesso!',
        data: newTraining,
      });

    } catch (error) {
      console.error('[TrainingController.createTraining] Error:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  /**
   * Busca personais próximos via PostGIS (Geolocalização)
   */
  async findNearbyTrainers(req: AuthenticatedRequest, res: Response) {
    try {
      const { lat, lng, radius_km = 10 } = req.query;

      if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude e Longitude são obrigatórias' });
      }

      const radiusMeters = Number(radius_km) * 1000;

      const nearbyTrainers = await prisma.$queryRaw`
        SELECT 
          p.id, 
          u.name, 
          p.specialties,
          ST_Distance(p.location, ST_MakePoint(${Number(lng)}, ${Number(lat)})::geography) as distance_meters
        FROM profiles p
        JOIN users u ON p.user_id = u.id
        WHERE u.role = 'PERSONAL'
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
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}