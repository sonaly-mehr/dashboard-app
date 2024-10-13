"use client";
import { useState, useEffect } from "react";
import { FaChartBar, FaSignOutAlt, FaBars, FaMoon, FaSun } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useTheme } from "next-themes";
import { MdManageHistory } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);  // State to prevent hydration mismatch
  const router = useRouter();

  // Ensure component is mounted before checking theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // To prevent any rendering issues on the server-side, we check if the component is mounted.
  if (!mounted) return null;

  return (
    <div className={`fixed z-50 h-full bg-gray-800 dark:bg-gray-900 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-16"} lg:w-64`}>
      {/* Sidebar header with theme toggle */}
      <div className="flex items-center justify-between py-4 px-2">
        <button onClick={() => setIsOpen(!isOpen)} className="text-base lg:text-2xl">
          <FaBars />
        </button>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-base lg:text-2xl"
        >
          {/* Icon changes based on current theme */}
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-10">
        <ul>
          <li className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaChartBar />
            <Link href="/dashboard" passHref>
              <span className={`ml-4 text-sm font-medium ${!isOpen && "hidden"} lg:inline`}>Dashboard</span>
            </Link>
          </li>
          <li className="flex items-center py-2 px-4 hover:bg-gray-700">
            <MdManageHistory />
            <Link href="/metrics" passHref>
              <span className={`ml-4 text-sm font-medium ${!isOpen && "hidden"} lg:inline`}>Metrics</span>
            </Link>
          </li>
          <li className="flex items-center py-2 px-4 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
            <FaSignOutAlt />
            <span className={`ml-4 text-sm font-medium ${!isOpen && "hidden"} lg:inline`}>Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;