// src/app/admin/layout.tsx
import Sidebar from '@/app/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-background p-6">{children}</main>
    </div>
  );
}
