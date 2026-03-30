'use client';

import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function Attendance() {
  const attendanceGrids = [
    {
      member: 'Maria Santos',
      month: 'December 2024',
      days: [
        true, true, true, false, true, true, true, false, true, true,
        true, true, false, true, true, true, true, true, false, true,
        true, true, true, true, false, true, true, true, true, false,
        true,
      ],
    },
    {
      member: 'Carlo Reyes',
      month: 'December 2024',
      days: [
        true, true, false, true, true, true, true, true, true, true,
        false, true, true, true, true, true, true, false, true, true,
        true, true, true, false, true, true, true, true, true, true,
        false,
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-bg">
        <Topbar title="ATTENDANCE" />

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bebas text-2xl tracking-widest text-text">Attendance Tracking</h2>
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 bg-transparent border border-border rounded-lg text-xs font-display text-muted hover:text-text transition-colors cursor-pointer">
                <option>December 2024</option>
                <option>November 2024</option>
                <option>October 2024</option>
              </select>
              <Button variant="ghost" size="md">
                ↓ Export
              </Button>
            </div>
          </div>

          {/* Attendance Cards */}
          <div className="space-y-6">
            {attendanceGrids.map((grid, idx) => (
              <Card key={idx} title={grid.member} subtitle={grid.month}>
                <div className="grid grid-cols-7 gap-1.5">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center">
                      <div className="text-8px text-muted font-mono font-semibold mb-1">{day}</div>
                    </div>
                  ))}
                  {grid.days.map((present, dayIdx) => (
                    <div
                      key={dayIdx}
                      className={`aspect-square rounded-lg flex items-center justify-center font-mono text-9px font-semibold border transition-all cursor-default ${
                        present
                          ? 'bg-success/15 border-success/30 text-success'
                          : 'bg-accent2/8 border-accent2/15 text-accent2/40'
                      }`}
                    >
                      {dayIdx + 1}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
