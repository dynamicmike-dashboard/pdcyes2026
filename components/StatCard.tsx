export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<any> | JSX.Element;
}) {
  return (
    <div className="bg-white p-4 rounded shadow border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="p-2 rounded bg-primary/10 text-primary">
          <span className="text-2xl">📅</span>
        </div>
      </div>
    </div>
  );
}
