type IconLike = string | React.ComponentType<any> | JSX.Element;

export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number | string;
  icon?: IconLike;
}) {
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === "string") {
      return <span className="text-2xl" aria-hidden>{icon}</span>;
    }
    if (typeof icon === "function") {
      const C = icon as React.ComponentType<any>;
      return <C />;
    }
    return icon;
  };

  return (
    <div className="bg-white p-4 rounded shadow border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="p-2 rounded bg-primary/10 text-primary">
          {renderIcon()}
        </div>
      </div>
    </div>
  );
}
