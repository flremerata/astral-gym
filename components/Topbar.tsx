'use client';

import { useState, useEffect } from 'react';

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  const [date, setDate] = useState<string>('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    setDate(formatted);
  }, []);

  return (
    <div className="sticky top-0 z-100 bg-bg/92 backdrop-blur-lg border-b border-border px-8 py-3.5 flex items-center gap-4">
      <div>
        <div className="font-bebas text-2xl tracking-widest text-text">{title}</div>
        <div className="font-mono text-10px text-muted">{date}</div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <input
          type="text"
          placeholder="Search members, transactions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-surface border border-border rounded-lg px-3.5 py-2 text-sm text-text placeholder-muted font-display outline-none transition-colors focus:border-accent/40"
        />
        <button className="px-4 py-2 bg-accent text-black rounded-lg font-display text-sm font-semibold tracking-wide transition-all hover:bg-yellow-400 active:translate-y-0.5">
          + New Member
        </button>
      </div>
    </div>
  );
}
