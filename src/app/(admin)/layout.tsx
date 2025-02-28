import Sidebar from "@/components/molecules/admin-sidebar";
import { getUserRole } from "@/utils/common"; // Pastikan fungsi ini mengembalikan role user

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userRole = getUserRole(); // Ambil role user dari cookie/session
  console.log("userRole", userRole);
  return (
    <div className="grid grid-cols-12">
      {userRole === "admin" && <Sidebar />}
      <main className={`${userRole === "admin" ? "col-span-10" : "col-span-12"} bg-background p-6`}>
        {children}
      </main>
    </div>
  );
}
