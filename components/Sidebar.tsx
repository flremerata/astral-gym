'use client';

import { useState } from 'react';
import Link from 'next/link';

const navigationItems = [
  { id: 'dashboard', icon: '⚡', label: 'Dashboard', href: '/' },
  { id: 'members', icon: '👥', label: 'Members', href: '/members' },
  { id: 'sales', icon: '💳', label: 'Sales & Payments', href: '/sales' },
  { id: 'reminders', icon: '🤖', label: 'AI Reminders', href: '/reminders', badge: 5 },
  { id: 'attendance', icon: '📋', label: 'Attendance', href: '/attendance' },
  { id: 'reports', icon: '📊', label: 'Reports', href: '/reports' },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <aside className="w-60 min-w-60 bg-surface border-r border-border flex flex-col relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-radial from-accent/7 to-transparent pointer-events-none"></div>

      {/* Logo Block */}
      <div className="px-6 py-7 border-b border-border">
        <div className="font-bebas text-4xl tracking-widest text-accent leading-none">ASTRAL</div>
        <div className="font-mono text-xs text-muted tracking-widest uppercase mt-1">Gym Management · v2.0</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {/* Main Section */}
        <div className="px-3 py-3 text-xs font-mono text-muted tracking-widest uppercase">Main</div>
        {navigationItems.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setActiveItem(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all border ${
              activeItem === item.id
                ? 'bg-accent/8 text-accent border-accent/15'
                : 'text-muted border-transparent hover:bg-surface2 hover:text-text'
            }`}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            <span className="text-sm font-medium tracking-tight">{item.label}</span>
            {item.badge && <span className="ml-auto bg-accent2 text-white text-xs font-mono px-1.5 py-0.5 rounded-full">{item.badge}</span>}
          </Link>
        ))}

        {/* Tools Section */}
        <div className="px-3 py-3 text-xs font-mono text-muted tracking-widest uppercase mt-2">Tools</div>
        {navigationItems.slice(3).map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setActiveItem(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all border ${
              activeItem === item.id
                ? 'bg-accent/8 text-accent border-accent/15'
                : 'text-muted border-transparent hover:bg-surface2 hover:text-text'
            }`}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            <span className="text-sm font-medium tracking-tight">{item.label}</span>
            {item.badge && <span className="ml-auto bg-accent2 text-white text-xs font-mono px-1.5 py-0.5 rounded-full">{item.badge}</span>}
          </Link>
        ))}
      </nav>

      {/* User Card Footer */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-2.5 p-2.5 bg-surface2 rounded-lg border border-border">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-yellow-600 rounded-full flex items-center justify-center font-bold text-xs text-black flex-shrink-0">
            JR
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold leading-tight">James Reyes</div>
            <div className="text-10px text-muted">Manager · Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
