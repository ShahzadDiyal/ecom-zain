"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  Search, 
  ShieldCheck, 
  User, 
  ShieldAlert,
  RefreshCw,
  Calendar
} from "lucide-react";
import { getAllUsers, updateUserRole } from "@/lib/services/userService";
import { UserProfile, UserRole } from "@/types/ecommerce";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingUid, setUpdatingUid] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (e) {
      console.error("Failed to fetch users:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleToggle = async (uid: string, currentRole: UserRole) => {
    const newRole: UserRole = currentRole === "admin" ? "user" : "admin";
    if (confirm(`Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`)) {
      setUpdatingUid(uid);
      try {
        await updateUserRole(uid, newRole);
        setUsers((prev) =>
          prev.map((u) => (u.uid === uid ? { ...u, role: newRole } : u))
        );
      } catch (err) {
        console.error("Failed to update user role:", err);
        alert("Failed to update user role.");
      } finally {
        setUpdatingUid(null);
      }
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.uid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <h1 className="font-serif-display text-3xl text-white tracking-wide uppercase">
            USER MANAGEMENT & ROLES
          </h1>
          <p className="font-inter text-xs text-neutral-400 tracking-widest uppercase mt-1">
            MANAGE REGISTERED ACCOUNTS AND ASSIGN ADMIN PRIVILEGES
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="px-4 py-2.5 bg-neutral-900 border border-neutral-700 hover:border-white text-xs uppercase tracking-wider text-white flex items-center gap-2 transition-colors shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Users
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-neutral-950 border border-neutral-800 p-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="SEARCH USERS BY NAME, EMAIL, UID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-neutral-800 px-4 py-2.5 pl-10 text-xs text-white uppercase placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
          />
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-neutral-950 border border-neutral-800 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-neutral-500 text-xs uppercase tracking-widest">
            Loading registered users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center text-neutral-500 text-xs uppercase tracking-widest">
            No registered users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs uppercase tracking-wider">
              <thead className="border-b border-neutral-800 text-neutral-400 text-[10px] bg-neutral-900/50">
                <tr>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Firebase UID</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Joined Date</th>
                  <th className="py-3.5 px-4 text-right">Role Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {filteredUsers.map((user) => (
                  <tr key={user.uid} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{user.displayName || "User"}</p>
                        <p className="text-[10px] text-neutral-400 lowercase">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-[10px] text-neutral-500">{user.uid}</td>
                    <td className="py-4 px-4">
                      {user.role === "admin" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold bg-red-950/60 border border-red-700 text-red-400">
                          <ShieldAlert className="w-3 h-3" /> ADMIN
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium bg-neutral-900 border border-neutral-800 text-neutral-400">
                          <User className="w-3 h-3" /> CUSTOMER
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-neutral-400 text-[10px]">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleRoleToggle(user.uid, user.role)}
                        disabled={updatingUid === user.uid}
                        className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold border transition-colors ${
                          user.role === "admin"
                            ? "bg-neutral-900 border-neutral-700 text-neutral-300 hover:border-white"
                            : "bg-red-950/40 border-red-800 text-red-400 hover:bg-red-900 hover:text-white"
                        }`}
                      >
                        {updatingUid === user.uid
                          ? "UPDATING..."
                          : user.role === "admin"
                          ? "Demote to User"
                          : "Promote to Admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
