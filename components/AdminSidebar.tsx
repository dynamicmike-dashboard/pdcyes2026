import Link from "next/link";
import { useSession } from "next-auth/react";

export function AdminSidebar() {
  const { data: session } = useSession();
  return (
    <aside className="w-64 bg-white border-r">
      <nav className="pt-6 space-y-4">
        <Link href="/admin" className="flex items-center px-4 py-2 text-gray-700 hover:bg-primary/10 rounded">
          Dashboard
        </Link>
        <Link href="/admin/events" className="flex items-center px-4 py-2 text-gray-700 hover:bg-primary/10 rounded">
          Events
        </Link>
        <Link href="/admin/events/new" className="flex items-center px-4 py-2 text-gray-700 hover:bg-primary/10 rounded">
          New Event
        </Link>
        {/* Settings placeholder */}
      </nav>
    </aside>
  );
}