"use client";

import { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Trash2,
  Loader2,
  Mail,
  Calendar,
  Shield,
  X,
} from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at: string | null;
}

const initialUsers: AdminUser[] = [
  {
    id: "1",
    email: "admin@bonardiconstruction.com",
    role: "admin",
    created_at: "2024-01-15T00:00:00Z",
    last_sign_in_at: "2026-04-05T09:00:00Z",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("editor");
  const [isInviting, setIsInviting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUsers(data.users && data.users.length > 0 ? data.users : initialUsers);
    } catch {
      setUsers(initialUsers);
    } finally {
      setIsLoading(false);
    }
  };

  const inviteUser = async () => {
    if (!inviteEmail.trim()) return;

    setIsInviting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/users/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Add to local state
      const newUser: AdminUser = {
        id: String(Date.now()),
        email: inviteEmail,
        role: inviteRole,
        created_at: new Date().toISOString(),
        last_sign_in_at: null,
      };
      setUsers((prev) => [...prev, newUser]);

      setSuccess(`Invitation sent to ${inviteEmail}`);
      setShowInvite(false);
      setInviteEmail("");
      setInviteRole("editor");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to invite user");
    } finally {
      setIsInviting(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setUsers((prev) => prev.filter((u) => u.id !== id));
      setSuccess("User removed");
      setDeleteConfirm(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-white/60 mt-1">Manage admin users</p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="bg-accent hover:bg-accent/90 text-gray-900 font-medium px-4 py-2 rounded-lg inline-flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Invite User
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-200">
          {success}
        </div>
      )}

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-gray-900 border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">
                Invite Admin User
              </h3>
              <button
                onClick={() => setShowInvite(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/60 mb-4">
              Send an invitation email to add a new admin user.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent [&>option]:bg-gray-900 [&>option]:text-white"
                >
                  <option value="admin">Admin - Full access</option>
                  <option value="editor">
                    Editor - Content management only
                  </option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowInvite(false)}
                className="px-4 py-2 text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={inviteUser}
                disabled={isInviting || !inviteEmail.trim()}
                className="bg-brand hover:bg-brand/80 text-white font-medium px-4 py-2 rounded-lg inline-flex items-center gap-2 disabled:opacity-50"
              >
                {isInviting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Send Invite
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-gray-900 border border-white/10 rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold text-white mb-2">
              Delete User
            </h3>
            <p className="text-white/60 mb-6">
              Are you sure you want to remove this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteUser(deleteConfirm)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No users yet
          </h3>
          <p className="text-white/60">Invite your first admin user</p>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/60 font-medium px-6 py-4">
                  User
                </th>
                <th className="text-left text-white/60 font-medium px-6 py-4 hidden md:table-cell">
                  Created
                </th>
                <th className="text-left text-white/60 font-medium px-6 py-4 hidden lg:table-cell">
                  Last Sign In
                </th>
                <th className="text-left text-white/60 font-medium px-6 py-4">
                  Role
                </th>
                <th className="text-right text-white/60 font-medium px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-brand" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.email}</p>
                        {user.id === "1" && (
                          <p className="text-xs text-accent">You</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Calendar className="w-4 h-4" />
                      {formatDate(user.created_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-white/60 text-sm">
                      {formatDate(user.last_sign_in_at)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                        user.role === "admin"
                          ? "bg-brand/20 text-blue-300"
                          : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      <Shield className="w-3 h-3" />
                      {user.role === "admin" ? "Admin" : "Editor"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.id !== "1" && (
                      <button
                        onClick={() => setDeleteConfirm(user.id)}
                        className="p-2 text-white/60 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Info */}
      <div className="bg-brand/10 border border-brand/20 rounded-xl p-6">
        <h3 className="font-semibold text-white mb-2">User Management</h3>
        <p className="text-white/60 text-sm">
          To manage users beyond the current session, you&apos;ll need to use
          the Supabase dashboard. New users can be invited via email, and
          they&apos;ll receive a link to set their password.
        </p>
      </div>
    </div>
  );
}
