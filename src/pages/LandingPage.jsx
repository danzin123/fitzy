import React from 'react';
import { Rocket, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-['Inter']">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#8eff71] rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-black rotate-45"></div>
          </div>
          <span className="text-2xl font-extrabold tracking-tighter">FITZY</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-[#8eff71] transition-colors">Funcionalidades</a>
          <a href="#pricing" className="hover:text-[#8eff71] transition-colors">Preços</a>
          <button className="bg-[#8eff71] text-black px-6 py-2 rounded-full font-bold hover:bg-[#7ae662] transition-all">
            Começar Agora
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#8eff71]/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
            ELEVE SEU TREINO AO <span className="text-[#8eff71]">NÍVEL ELITE.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            A plataforma definitiva para personal trainers que buscam gestão impecável, 
            estética high-end e resultados exponenciais para seus alunos.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="w-full md:w-auto px-10 py-4 bg-[#8eff71] text-black font-black rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
              QUERO SER PRO <ArrowRight size={20} />
            </button>
            <button className="w-full md:w-auto px-10 py-4 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl font-bold hover:bg-white/10 transition-all">
              Ver Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-8 py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-white/5 bg-[#121212] group hover:border-[#8eff71]/30 transition-all">
              <Zap className="text-[#8eff71] mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4">Gestão Veloz</h3>
              <p className="text-gray-400">Crie treinos complexos em segundos com nossa interface otimizada para performance.</p>
            </div>
            <div className="p-8 rounded-3xl border border-white/5 bg-[#121212] group hover:border-[#8eff71]/30 transition-all">
              <Shield className="text-[#8eff71] mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4">Finanças Blindadas</h3>
              <p className="text-gray-400">Cobranças automáticas e controle de faturamento em um dashboard de alto luxo.</p>
            </div>
            <div className="p-8 rounded-3xl border border-white/5 bg-[#121212] group hover:border-[#8eff71]/30 transition-all">
              <Rocket className="text-[#8eff71] mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4">App do Aluno</h3>
              <p className="text-gray-400">Experiência mobile impecável para o seu aluno marcar presença e evoluir cargas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        © 2026 Fitzy by DM Labtech. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default LandingPage;