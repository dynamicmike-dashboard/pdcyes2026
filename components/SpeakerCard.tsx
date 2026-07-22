export function SpeakerCard({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center w-32">
      <img
        src="/images/speaker-placeholder.jpg"
        alt={name}
        className="w-16 h-16 rounded-full mb-2 object-cover"
      />
      <h3 className="text-sm font-medium">{name}</h3>
    </div>
  );
}