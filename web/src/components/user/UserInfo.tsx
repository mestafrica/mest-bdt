"use client";
import Image from "next/image";
import { useUser } from "@/hooks/user";
import SubmitButton from "../core/SubmitButton";
import { apiClient } from "@/utils/api";
import toast from "react-hot-toast";

export default function UserInfo() {
  const { user, mutate } = useUser();

  const handleSubmit = async (data: FormData) => {
    try {
      await apiClient.patch(`/users/${user?.id}`, {
        name: data.get("name"),
        phone: data.get("phone"),
        location: data.get("location"),
        bio: data.get("bio"),
      });
      toast.success("User updated successfully");
      await mutate();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1d24] shadow rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row gap-8">
      {/* IMAGE SECTION */}
      <div className="flex flex-col items-center sm:items-start sm:w-1/3">
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-full sm:rounded-lg overflow-hidden shadow">
          <Image
            src={
              user?.avatar ||
              "https://i.pinimg.com/1200x/b2/db/80/b2db80290f2aba3567213d4eab1117a5.jpg"
            }
            alt="User Avatar"
            fill
            className="object-cover"
          />
        </div>

        {/* Change Avatar Button */}
        <button
          type="button"
          className="mt-4 text-sm bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Change Avatar
        </button>
      </div>

      {/* USER INFORMATION FORM */}
      <div className="flex-1 space-y-6">
        <form
          autoComplete="off"
          action={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div>
            <label className="text-sm">Full Name</label>
            <input
              name="name"
              defaultValue={user?.name}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input
              name="email"
              readOnly
              defaultValue={user?.email}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
            />
          </div>

          <div>
            <label className="text-sm">Phone Number</label>
            <input
              name="phone"
              defaultValue={user?.phone}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
            />
          </div>

          <div>
            <label className="text-sm">Location</label>
            <input
              name="location"
              defaultValue={user?.location}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
            />
          </div>

          <div className="col-span-full">
            <label className="text-sm">Bio / About</label>
            <textarea
              name="bio"
              rows={4}
              defaultValue={user?.bio}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
            />
          </div>

          <div className="col-span-full flex justify-end">
            <SubmitButton title="Save Changes" />
          </div>
        </form>
      </div>
    </div>
  );
}
