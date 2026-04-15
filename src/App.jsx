import DashboardShell from './components/layout/DashboardShell';
import StatsCard from './components/common/StatsCard';
import { DollarSign, Users, Activity } from 'lucide-react';

export default function App() {
  return (
    <DashboardShell>
      <h2 className="text-2xl font-bold text-text-primary mb-8">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatsCard
          label="Receita Mensal"
          value="R$ 12.400"
          trend="up"
          delta="8.3% este mês"
          chartData={[10, 20, 15, 30, 25, 40]}
        />
        <StatsCard
          label="Alunos Ativos"
          value="42"
          trend="up"
          delta="2 novos"
          chartData={[50, 60, 80, 100, 120, 142]}
        />
        <StatsCard
          label="Retenção Média"
          value="94%"
          trend="neutral"
          delta="Stable"
          chartData={[15, 16, 14, 15, 16, 15]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-low border border-border-ghost rounded-xl p-6">
        <div>
          <h3 className="text-base font-semibold text-text-primary mb-4">SaaS Architecture</h3>
          <div className="font-mono text-[11px] text-[#888] leading-6 p-4 bg-black rounded-lg">
            src/<br/>
            ├── components/ <br/>
            │&nbsp;&nbsp;&nbsp;├── common/ <span className="text-primary">// Button, Input, Icon</span><br/>
            │&nbsp;&nbsp;&nbsp;└── layout/ <span className="text-primary">// Sidebar, TopNav</span><br/>
            ├── hooks/ <span className="text-primary">// useAuth, useStats</span><br/>
            ├── pages/ <span className="text-primary">// Dashboard, Training</span><br/>
            ├── services/ <span className="text-primary">// api.js, coachData.js</span><br/>
            └── tailwind.config.js
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold text-text-primary mb-4">Design System Tokens</h3>
          <p className="text-[0.8125rem] text-text-muted mb-4">Kinetic Noir extends the Tailwind configuration to enforce brand consistency across the platform.</p>
          <div className="font-mono text-[11px] text-[#888] leading-6 p-4 bg-black rounded-lg">
            colors: { '{' }<br/>
            &nbsp;&nbsp;primary: '<span className="text-primary">#8eff71</span>',<br/>
            &nbsp;&nbsp;background: '#0e0e0e',<br/>
            &nbsp;&nbsp;surface: { '{' } low: '#131313' { '}' }<br/>
            { '}' },<br/>
            spacing: { '{' } section: '2.5rem' { '}' },<br/>
            borderRadius: { '{' } pill: '100px' { '}' }
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
