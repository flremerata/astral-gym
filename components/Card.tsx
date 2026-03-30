import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function Card({ title, subtitle, children, header, action, className = '' }: CardProps) {
  return (
    <div className={`bg-surface border border-border rounded-xl overflow-hidden ${className}`}>
      {(title || header) && (
        <>
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            {header ? (
              header
            ) : (
              <div>
                <div className="font-semibold text-sm text-text">{title}</div>
                {subtitle && <div className="text-xs text-muted mt-0.5">{subtitle}</div>}
              </div>
            )}
            {action && <div>{action}</div>}
          </div>
        </>
      )}
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}
