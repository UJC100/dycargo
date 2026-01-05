'use client';

export default function StatCard({ title, value, children }: { title: string; value: string | number; children?: React.ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      {children && <div className="mt-3 text-xs text-muted-foreground">{children}</div>}
    </div>
  );
}
