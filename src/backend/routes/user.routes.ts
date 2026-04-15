import { Router } from 'express';
import { prisma } from '../infrastructure/db/prisma.js';
import { requireAuth } from '../infrastructure/http/middlewares/auth.middleware.js';

const userRoutes = Router();

userRoutes.get('/students', requireAuth, async (req: any, res) => {
  try {
    const personalId = req.user.id;

    // Busca usuários com role STUDENT que possuem treinos com este personal
    const students = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
        trainingsRec: { some: { personalId } }
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: { avatarUrl: true }
        }
      }
    });

    return res.json(students);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar alunos.' });
  }
});

export { userRoutes };