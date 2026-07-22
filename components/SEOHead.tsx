type Props = {
  title?: string;
  description?: string;
  image?: string;
  pathname?: string;
};

export default function SEOHead({
  title,
  description,
  image,
  pathname = "",
}: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pdcye.com";
  const finalTitle = title ?? "PDCYES";
  const finalDescription =
    description ?? "Personal Development Community in Playa del Carmen";
  const finalImage = image ?? `${baseUrl}/images/logo.png`;
  const url = `${baseUrl}${pathname}`;
  return (
    <>
      <title>{`${finalTitle} | PDCYES`}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
