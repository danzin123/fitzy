import React from 'react';
import { LayoutDashboard, Users, Dumbbell, Apple, DollarSign, BarChart3, Settings, Bell, Search } from 'lucide-react';

export default function DashboardShell({ children }) {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Alunos', icon: Users },
    { name: 'Treinos', icon: Dumbbell },
    { name: 'Nutrição', icon: Apple },
    { name: 'Financeiro', icon: DollarSign },
    { name: 'Relatórios', icon: BarChart3 },
    { name: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-60 bg-surface-low border-r border-border-ghost flex flex-col fixed h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Fitzy</h1>
        </div>
        
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ease-out ${
                index === 0 
                  ? 'bg-surface-mid text-primary border-l-2 border-primary' 
                  : 'text-text-muted hover:bg-surface-mid hover:text-text-primary'
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-border-ghost">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-high flex items-center justify-center text-primary font-bold">
              AT
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Alex Trainer</p>
              <p className="text-xs text-text-muted">Elite Trainer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-60">
        {/* Top Nav */}
        <header className="h-16 bg-surface-low border-b border-border-ghost flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Buscar alunos ou treinos..." 
              className="w-full bg-surface-mid border border-border-ghost rounded-lg py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-text-muted hover:text-primary transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-surface-high border border-border-ghost" />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
