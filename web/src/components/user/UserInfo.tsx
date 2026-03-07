"use client";
import Image from "next/image";
import { useUser } from "@/hooks/user";
import SubmitButton from "../core/SubmitButton";
import { apiClient } from "@/utils/api";
import toast from "react-hot-toast";
import { User, Phone, MapPin, Info, Mail } from "lucide-react";

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
    <div className="card-meltwater p-8 sm:p-10 flex flex-col md:flex-row gap-12">
      {/* IMAGE SECTION */}
      <div className="flex flex-col items-center sm:items-start md:w-1/4">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-xl shadow-primary/5 ring-4 ring-foreground/5 transition-all hover:ring-primary/20">
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
          className="mt-6 text-xs font-bold text-foreground/40 hover:text-primary uppercase tracking-widest underline underline-offset-8 decoration-foreground/10 hover:decoration-primary/30 transition-all"
        >
          Replace Avatar
        </button>
      </div>

      {/* USER INFORMATION FORM */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-8">
          <Info size={18} className="text-primary" />
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            Personal Details
          </h2>
        </div>

        <form
          autoComplete="off"
          action={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1 flex items-center gap-2">
              <User size={12} /> Full Name{" "}
              <span className="text-primary">*</span>
            </label>
            <input
              name="name"
              defaultValue={user?.name}
              required
              className="w-full px-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold placeholder:text-foreground/20 outline-none transition-all font-sans"
            />
          </div>

          <div className="space-y-2 opacity-60 grayscale cursor-not-allowed">
            <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1 flex items-center gap-2">
              <Mail size={12} /> Email Address (Primary)
            </label>
            <input
              name="email"
              readOnly
              defaultValue={user?.email}
              className="w-full px-4 py-3 bg-foreground/5 border border-transparent rounded-xl text-sm font-bold outline-none font-sans"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1 flex items-center gap-2">
              <Phone size={12} /> Phone Number
            </label>
            <input
              name="phone"
              defaultValue={user?.phone}
              placeholder="+233 ..."
              className="w-full px-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold placeholder:text-foreground/20 outline-none transition-all font-sans"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1 flex items-center gap-2">
              <MapPin size={12} /> Primary Location
            </label>
            <input
              name="location"
              defaultValue={user?.location}
              placeholder="e.g. Accra, Ghana"
              className="w-full px-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold placeholder:text-foreground/20 outline-none transition-all font-sans"
            />
          </div>

          <div className="col-span-full space-y-2">
            <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1 flex items-center gap-2">
              <FileText size={12} className="rotate-0" /> Professional Bio
            </label>
            <textarea
              name="bio"
              rows={5}
              defaultValue={user?.bio}
              placeholder="Tell us a bit about your professional background..."
              className="w-full px-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold placeholder:text-foreground/20 outline-none transition-all font-sans resize-none"
            />
          </div>

          <div className="col-span-full flex justify-end pt-4">
            <SubmitButton
              title="Update Profile"
              className="px-12 py-3.5 btn-pill text-sm shadow-lg shadow-primary/20"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

const FileText = ({
  size,
  className,
}: {
  size: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
