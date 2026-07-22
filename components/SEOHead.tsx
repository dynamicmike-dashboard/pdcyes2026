import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function SEOHead({
  title,
  description,
  image,
}: { title?: string; description?: string; image?: string }) {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pdcye.com";

  const defaults = useMemo(() => {
    return {
      title: title ?? "PDCYES",
      description:
        description ?? "Personal Development Community in Playa del Carmen",
      image: image ?? `${baseUrl}/images/logo.png`,
    };
  }, [title, description, image, baseUrl]);

  return (
    <>
      <title>{`${defaults.title} | PDCYES`}</title>
      <meta name="description" content={defaults.description} />
      <link rel="canonical" href={`${baseUrl}${pathname}`} />
      <meta property="og:title" content={defaults.title} />
      <meta property="og:description" content={defaults.description} />
      <meta property="og:image" content={defaults.image} />
      <meta property="og:url" content={`${baseUrl}${pathname}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}