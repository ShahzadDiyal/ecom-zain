import React from "react";
import AdminGuard from "@/components/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-black text-white flex pt-20">
        <AdminSidebar />
        <main className="flex-1 p-8 sm:p-10 overflow-x-auto bg-black">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
