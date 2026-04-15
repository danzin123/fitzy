import express from 'express';
import cors from 'cors';
import { authRoutes } from './src/backend/routes/auth.routes.js';
import trainingRoutes from './src/backend/routes/training.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rota de Health Check (Agora o link http://localhost:3000/api/health vai funcionar)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Fitzy Backend is running' });
});

// Registro das rotas com o prefixo /api para organização
app.use('/api/auth', authRoutes);
app.use('/api/trainings', trainingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Fitzy Backend rodando em http://localhost:${PORT}`);
  console.log(`✅ Health Check disponível em http://localhost:${PORT}/api/health`);
});