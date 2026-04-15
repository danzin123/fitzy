import 'dotenv/config'; // <-- ISSO RESOLVE O ERRO DO BANCO DE DADOS
import express from 'express';
import cors from 'cors';
import { authRoutes } from './src/backend/routes/auth.routes.js';
import trainingRoutes from './src/backend/routes/training.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Fitzy Backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/trainings', trainingRoutes);

// Mudando a API para a porta 3333 para não bater de frente com o Frontend
const PORT = process.env.PORT || 3333;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Fitzy Backend rodando em http://localhost:${PORT}`);
});