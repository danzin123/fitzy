import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import StatsCard from '../common/StatsCard';

// Mudamos o nome para DashboardShell para bater com o App.jsx
const DashboardShell = () => {
  const [stats, setStats] = useState({ totalStudents: 0, totalTrainings: 0, revenue: 0 });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('@Fitzy:user'));
    setUser(savedUser);

    async function loadDashboardData() {
      try {
        const response = await api.get('/trainings/stats');
        setStats(response.data);
      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0e] p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-white italic tracking-tighter">
          OLÁ, <span className="text-[#8eff71] uppercase">{user?.name || 'TRAINER'}</span>
        </h1>
        <p className="text-gray-500 font-medium">Aqui está o desempenho da sua tropa hoje.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="ALUNOS ATIVOS" 
          value={stats.totalStudents} 
          trend="+2 essa semana" 
        />
        <StatsCard 
          label="TREINOS CRIADOS" 
          value={stats.totalTrainings} 
          trend="Total histórico" 
        />
        <StatsCard 
          label="RECEITA ESTIMADA" 
          value={`R$ ${stats.revenue.toLocaleString()}`} 
          trend="Previsão mensal" 
        />
      </div>
    </div>
  );
};

// A exportação padrão que o Vite precisa:
export default DashboardShell;