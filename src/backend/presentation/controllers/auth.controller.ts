import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../infrastructure/db/prisma.js';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      // Verifica se o usuário já existe
      const userExists = await prisma.user.findUnique({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já cadastrado com este e-mail.' });
      }

      // Criptografa a senha
      const passwordHash = await bcrypt.hash(password, 8);

      // Cria o usuário no banco
      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: role || 'PERSONAL',
        },
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      // AGORA O SERVIDOR VAI GRITAR O ERRO NO TERMINAL!
      console.error('❌ [ERRO NO CADASTRO]:', error);
      return res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Busca o usuário pelo e-mail
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
      }

      // Compara a senha enviada com a do banco
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
      }

      // Gera o Token JWT (Dura 7 dias)
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret_key_fitzy',
        { expiresIn: '7d' }
      );

      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error('❌ [ERRO NO LOGIN]:', error);
      return res.status(500).json({ error: 'Erro ao realizar login.' });
    }
  }
}