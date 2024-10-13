"use client";

import Sidebar from "@/components/Sidebar";
import withAuth from "@/lib/withAuth";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-6 ml-16 lg:ml-64">{children}</div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </ThemeProvider>
    </>
  );
};

export default withAuth(DashboardLayout);
