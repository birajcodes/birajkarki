const ROWS = [
  { label: "CURRENT STATE", value: "BUILDING / LEARNING / EXPLORING" },
  { label: "MODE", value: "DEEP WORK" },
  { label: "LAST EXPERIMENT", value: "IBM QUANTUM CHALLENGE 2024" },
  { label: "THINKING ABOUT", value: "QUANTUM + MACHINE LEARNING" },
];

export default function SystemStatus() {
  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
      {ROWS.map((row) => (
        <div key={row.label} className="bg-bg px-5 py-4">
          <dt className="font-mono text-[9px] tracking-[0.15em] text-fg-dim">
            {row.label}
          </dt>
          <dd className="mt-1.5 font-mono text-xs tracking-[0.03em] text-fg">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
