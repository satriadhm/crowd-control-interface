import { LOGOUT } from "@/graphql/mutations/auth";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@apollo/client";
import { Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function ValidatorSidebar() {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const [logoutMutation] = useMutation(LOGOUT);
  const pathname = usePathname();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await logoutMutation();
      clearAuth();
      router.push("/login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const isActive = (path: string) => path.includes(pathname);

  return (
    <aside className="bg-[#001333] h-screen text-white col-span-2 flex flex-col justify-between shadow-xl overflow-hidden">
      <div>
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-200 p-4 mt-4">
          Validator Panel
        </h2>
        <nav className="p-2">
          <ul className="space-y-2">
            <li
              className={` text-sm bg-gradient-to-r p-4 rounded-lg ${
                isActive("/validator/validate-question")
                  ? "border  bg-[#5460ff] to-[#032054] "
                  : ""
              }`}
            >
              <button
                onClick={() => navigateTo("/validator/validate-question")}
                className="flex items-center gap-3 w-full text-gray-300 hover:text-white transition-all"
              >
                <Users size={20} />
                <span>Validate Questions</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-2">
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-[#5460ff] to-[#032054] text-white rounded-lg p-4 w-full"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
