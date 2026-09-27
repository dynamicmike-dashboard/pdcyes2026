"use client";
import { getImageUrl } from "@/lib/github";

export function SpeakerCard({ name, image }: { name: string; image?: string }) {
  const imgSrc = image ? getImageUrl(image) : "/images/speaker-placeholder.jpg";

  return (
    <div className="flex flex-col items-center text-center w-48 p-4 bg-gray-50 border border-gray-100 rounded-xl shadow-xs">
      <img
        src={imgSrc}
        alt={name}
        className="w-40 h-40 rounded-full mb-3 object-cover border-2 border-primary/20 bg-gray-200"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=0D8ABC&color=fff&size=160";
        }}
      />
      <h3 className="text-sm font-bold text-gray-900 leading-snug">{name}</h3>
    </div>
  );
}