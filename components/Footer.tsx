export function Footer() {
  return (
    <footer className="bg-gray-50 py-8 mt-12 border-t">
      <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} PDCYES. All rights reserved.
        </p>
        <div className="mt-4">
          <a href="#" className="mr-4 hover:text-secondary">Instagram</a>
          <a href="#" className="mr-4 hover:text-secondary">Facebook</a>
          <a href="#" className="hover:text-secondary">Meetup</a>
        </div>
      </div>
    </footer>
  );
}