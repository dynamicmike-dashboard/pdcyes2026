export function CharacterCounter({
  value,
  limit,
}: {
  value: string;
  limit: number;
}) {
  const remaining = limit - value.length;
  const isOver = remaining < 0;

  return (
    <p className="text-xs text-right">
      {remaining < 0 ? `0/${limit}` : `${remaining}/${limit}`}{
        isOver ? " (over limit!)" : ""
      }
    </p>
  );
}