import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'PERSONAL' // Valor padrão para o Fitzy B2B
  });

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Chamada para a rota que criamos no back-end
      await api.post('/auth/register', formData);
      
      alert('Conta criada com sucesso! Agora você pode fazer login.');
      navigate('/login');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erro ao criar conta. Tente outro e-mail.';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-6 font-['Inter']">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white tracking-tighter">CRIE SUA CONTA</h2>
          <p className="text-gray-500 text-sm mt-2">Comece a gerir seus alunos como um elite</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Nome */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nome Completo</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within:text-[#8eff71] transition-colors">
                <User size={18} />
              </div>
              <input 
                type="text" 
                required
                placeholder="Como quer ser chamado?"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#131313] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#8eff71]/50 transition-all"
              />
            </div>
          </div>

          {/* E-mail */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail Profissional</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within:text-[#8eff71] transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required
                placeholder="seu@trabalho.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#131313] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#8eff71]/50 transition-all"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Senha</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within:text-[#8eff71] transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required
                placeholder="No mínimo 6 caracteres"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#131313] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#8eff71]/50 transition-all"
              />
            </div>
          </div>

          {/* Benefícios (Social Proof) */}
          <div className="bg-[#1a1a1a]/50 p-4 rounded-2xl space-y-2 border border-white/5">
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              <CheckCircle2 size={14} className="text-[#8eff71]" /> Acesso imediato ao Dashboard
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              <CheckCircle2 size={14} className="text-[#8eff71]" /> Gestão ilimitada de alunos
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#8eff71] text-black font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(142,255,113,0.15)] disabled:opacity-50"
          >
            {loading ? 'CRIANDO CONTA...' : 'CRIAR MINHA CONTA'} <ArrowRight size={20} />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Já tem uma conta? <Link to="/login" className="text-[#8eff71] font-bold hover:underline">Fazer Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;