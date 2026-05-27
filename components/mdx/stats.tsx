export function Stats({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="not-prose my-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="min-w-0 border-t border-line pt-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
            {s.label}
          </div>
          <div className="mt-2 font-display text-lg font-bold leading-snug tracking-tight break-words sm:text-xl">
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
