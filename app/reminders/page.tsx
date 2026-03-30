'use client';

import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

export default function Reminders() {
  const reminders = [
    {
      type: 'warn',
      icon: '⚠️',
      name: 'Ana Lim',
      desc: 'Premium plan expires in 2 days',
    },
    {
      type: 'danger',
      icon: '🔴',
      name: 'Ben Marasigan',
      desc: 'Payment pending for 5 days',
    },
    {
      type: 'info',
      icon: 'ℹ️',
      name: 'Maria Santos',
      desc: 'Low attendance this month (28%)',
    },
  ];

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-bg">
        <Topbar title="AI REMINDERS" />

        <div className="p-8">
          <h2 className="font-bebas text-2xl tracking-widest text-text mb-6">AI-Powered Reminders</h2>

          {/* AI Banner */}
          <Card className="bg-gradient-to-br from-accent/6 to-accent3/4 border-accent/15 mb-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🤖</div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-text mb-1">Intelligent Member Alerts</div>
                <div className="text-xs text-muted">
                  AI automatically monitors member activity and generates reminders for expirations, payment issues, and engagement patterns.
                </div>
              </div>
            </div>
          </Card>

          {/* Reminders List */}
          <Card title="Active Reminders" action={<Badge type="active">5 Active</Badge>}>
            <div className="space-y-3">
              {reminders.map((reminder, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    reminder.type === 'warn'
                      ? 'bg-accent/5 border-accent/20'
                      : reminder.type === 'danger'
                        ? 'bg-accent2/5 border-accent2/20'
                        : 'bg-accent3/5 border-accent3/20'
                  }`}
                >
                  <div className="text-xl flex-shrink-0">{reminder.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{reminder.name}</div>
                    <div className="text-xs text-muted">{reminder.desc}</div>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-semibold bg-accent text-black rounded-lg hover:bg-yellow-400 transition-all flex-shrink-0">
                    Action
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
