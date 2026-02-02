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
    <div className="bg-white shadow-lg rounded-2xl border border-gray-300 p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Invite Form Section */}
        <div className="w-full md:w-1/3">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="text-blue-600" size={24} />
            <h2 className="text-lg font-bold text-gray-900">Invite Member</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Invite a new member to join this company workspace.
          </p>

          <form id="invite-form" action={handleInvite} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Email Address <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="colleage@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Access <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Shield
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <select
                  name="access"
                  required
                  defaultValue="READ"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm appearance-none bg-white"
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
        <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>

        {/* Invited Users List */}
        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Invited Members
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 rounded-tl-lg">Email</th>
                  <th className="py-3 px-4">Access</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users && users.length > 0 ? (
                  users.map((user: User) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {user.email}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                          {user.access}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            user.status === "ACCEPTED"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {user.status || "PENDING"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleRevoke(user.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          title="Revoke Invitation"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
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
