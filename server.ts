import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import trainingRoutes from './src/backend/routes/training.routes.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global Middlewares
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', environment: process.env.NODE_ENV });
  });

  app.use('/api/trainings', trainingRoutes);

  // Vite middleware for development (Frontend integration)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Fitzy Backend] Server running on http://localhost:${PORT}`);
    console.log(`[Fitzy Backend] API Health Check: http://localhost:${PORT}/api/health`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
