import Sidebar from "@/components/molecules/admin-sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-background p-6">{children}</main>
    </div>
  );
}
