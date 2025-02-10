import Sidebar from "@/components/molecules/admin-sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <main className="col-span-10 bg-background p-6">{children}</main>
    </div>
  );
}
