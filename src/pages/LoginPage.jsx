import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-6 font-['Inter']">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-12 h-12 bg-[#8eff71] rounded-xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(142,255,113,0.3)]">
            <div className="w-6 h-6 bg-black rotate-45"></div>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter">BEM-VINDO AO FITZY</h2>
          <p className="text-gray-500 text-sm mt-2">Acesse seu painel de comando</p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within:text-[#8eff71] transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                placeholder="seu@email.com"
                className="w-full bg-[#131313] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#8eff71]/50 focus:ring-1 focus:ring-[#8eff71]/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Senha</label>
              <a href="#" className="text-[10px] text-[#8eff71] hover:underline uppercase font-bold tracking-tighter">Esqueceu a senha?</a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within:text-[#8eff71] transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-[#131313] border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#8eff71]/50 focus:ring-1 focus:ring-[#8eff71]/50 transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#8eff71] text-black font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(142,255,113,0.15)]"
          >
            ENTRAR NO SISTEMA <LogIn size={20} />
          </button>
        </form>

        {/* Footer Login */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Não é um membro? <a href="#" className="text-[#8eff71] font-bold hover:underline">Solicitar Acesso</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;