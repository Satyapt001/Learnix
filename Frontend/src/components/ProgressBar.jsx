export default function ProgressBar({ value = 0 }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div className="h-2 bg-brand rounded" style={{ width: `${pct}%` }} />
    </div>
  );
}