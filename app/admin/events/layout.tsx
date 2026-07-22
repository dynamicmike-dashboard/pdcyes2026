export default function AdminEventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  );
}