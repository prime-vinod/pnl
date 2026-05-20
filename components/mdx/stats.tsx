export function Stats({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="my-12 grid grid-cols-2 gap-8 md:grid-cols-4">
      {items.map((s) => (
        <div key={s.label}>
          <div className="font-display text-4xl font-black tracking-tight">
            {s.value}
          </div>
          <div className="mt-1 font-mono text-xs uppercase tracking-widest text-ink-dim">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
