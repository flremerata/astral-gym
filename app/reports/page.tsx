'use client';

import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import Card from '@/components/Card';

export default function Reports() {
  const reportCards = [
    {
      icon: '📊',
      title: 'Member Analytics',
      desc: 'Detailed insights on member demographics, retention, and engagement',
    },
    {
      icon: '💰',
      title: 'Revenue Report',
      desc: 'Complete breakdown of income sources and payment trends',
    },
    {
      icon: '📈',
      title: 'Growth Metrics',
      desc: 'Track membership growth, churn rate, and expansion analysis',
    },
    {
      icon: '🎯',
      title: 'Performance Dashboard',
      desc: 'KPI tracking and goal progress visualization',
    },
    {
      icon: '📅',
      title: 'Attendance Report',
      desc: 'Member check-in patterns and peak hours analysis',
    },
    {
      icon: '🏆',
      title: 'Top Performers',
      desc: 'Most active members and class attendance leaders',
    },
  ];

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-bg">
        <Topbar title="REPORTS" />

        <div className="p-8">
          <h2 className="font-bebas text-2xl tracking-widest text-text mb-6">Generate Reports</h2>

          {/* Report Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {reportCards.map((report, idx) => (
              <Card key={idx} className="cursor-pointer hover:border-accent/30 hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">{report.icon}</div>
                <div className="font-semibold text-sm text-text mb-1">{report.title}</div>
                <div className="text-xs text-muted">{report.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
