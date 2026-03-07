"use client";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { apiClient, apiFetcher } from "@/utils/api";
import SubmitButton from "../core/SubmitButton";
import toast from "react-hot-toast";
import { Mail, Shield, UserPlus, Trash2 } from "lucide-react";

type User = {
  id: string;
  email: string;
  access: string;
  status: string;
  createdAt: string;
};

export default function InviteUserSection() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("id");
  const { data: users, mutate } = useSWR(
    companyId ? `/users?filter={"company": "${companyId}"}` : null,
    apiFetcher,
  );

  const handleInvite = async (formData: FormData) => {
    try {
      await apiClient.post(`/users`, {
        email: formData.get("email"),
        access: formData.get("access"),
        company: companyId,
      });
      toast.success("Invitation sent successfully!");
      mutate(); // Refresh list
      // customized form reset if needed, or rely on uncontrolled form clearing if we reset the form element
      const form = document.getElementById("invite-form") as HTMLFormElement;
      form?.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send invitation.");
    }
  };

  const handleRevoke = async (userId: string) => {
    try {
      await apiClient.delete(`/users/${userId}`);
      toast.success("User revoked.");
      mutate();
    } catch (error) {
      console.error(error);
      toast.error("Failed to revoke user.");
    }
  };

  return (
    <div className="bg-[#0B1220] rounded-md border border-slate-800 p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Invite Form Section */}
        <div className="w-full md:w-1/3">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="text-blue-500" size={24} />
            <h2 className="text-lg font-medium text-slate-100">Invite Member</h2>
          </div>
          <p className="text-sm text-slate-400 mb-6">
            Invite a new member to join this company workspace.
          </p>

          <form id="invite-form" action={handleInvite} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-slate-400"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="colleage@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-slate-700 bg-[#0f1724] text-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Access <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Shield
                  className="absolute left-3 top-3 text-slate-400"
                  size={18}
                />
                <select
                  name="access"
                  required
                  defaultValue="READ"
                  className="w-full pl-10 pr-4 py-2 border border-slate-700 bg-[#0f1724] text-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm appearance-none transition-colors"
                >
                  <option value="READ">Read</option>
                  <option value="WRITE">Write</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <SubmitButton title="Send Invitation" />
            </div>
          </form>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-slate-800 self-stretch"></div>

        {/* Invited Users List */}
        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-medium text-slate-100 mb-4">
            Invited Members
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-[#0f1724] text-slate-400 font-medium border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 rounded-tl-lg font-medium">Email</th>
                  <th className="py-3 px-4 font-medium">Access</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 rounded-tr-lg font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {users && users.length > 0 ? (
                  users.map((user: User) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-slate-200">
                        {user.email}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-900/40 border border-blue-800/50 text-blue-200 rounded text-xs font-semibold">
                          {user.access}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            user.status === "ACCEPTED"
                              ? "bg-green-900/40 border border-green-800/50 text-green-200"
                              : "bg-yellow-900/40 border border-yellow-800/50 text-yellow-200"
                          }`}
                        >
                          {user.status || "PENDING"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleRevoke(user.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors flex items-center justify-center p-1 rounded-md hover:bg-slate-800"
                          title="Revoke Invitation"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      No pending invitations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
