import { Profile } from "@/utils/types";
import { Mail, Calendar, Eye, User } from "lucide-react";
import Link from "next/link";

export interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="bg-[#0f1724] rounded-xl overflow-hidden border border-slate-800 shadow-sm flex flex-col group transition-all duration-300 hover:border-slate-700 hover:shadow-md">
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-blue-900/20 rounded-xl group-hover:bg-blue-900/30 transition-colors">
            <User className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex gap-2">
            <Link href={`/profiles/view?id=${profile.id}`}>
              <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-all" title="View Details">
                <Eye size={18} />
              </button>
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-slate-100 font-semibold truncate" title={profile.email}>
              {profile.email.split('@')[0]}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <Mail size={12} className="text-slate-500" />
              <span className="truncate">{profile.email}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Calendar size={12} />
              <span>Added {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</span>
            </div>
            <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider">
              Profile
            </span>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-slate-900/30 border-t border-slate-800 flex justify-end gap-2">
        <Link href={`/profiles/view?id=${profile.id}`} className="flex-1">
          <button className="w-full py-1.5 text-xs font-medium text-slate-300 hover:text-blue-400 transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
