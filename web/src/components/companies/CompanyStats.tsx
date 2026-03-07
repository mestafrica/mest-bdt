import { Building2, Users, Calendars, IdCardLanyard } from "lucide-react";

export default function CompanyStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[#0B1220] text-sm px-6 py-5 rounded-md border border-slate-800 w-full flex flex-col justify-between">
        <h2 className="mb-4 text-slate-400 font-medium">Sector</h2>
        <span className="flex items-center gap-2 text-slate-100">
          <Building2 size={20} className="text-slate-500" />
          <p className="font-medium text-base">Technology</p>
        </span>
      </div>
      <div className="bg-[#0B1220] text-sm px-6 py-5 rounded-md border border-slate-800 w-full flex flex-col justify-between">
        <h2 className="mb-4 text-slate-400 font-medium">Company size</h2>
        <span className="flex items-center gap-2 text-slate-100">
          <IdCardLanyard size={20} className="text-slate-500" />
          <p className="font-medium text-base">250 employees</p>
        </span>
      </div>
      <div className="bg-[#0B1220] text-sm px-6 py-5 rounded-md border border-slate-800 w-full flex flex-col justify-between">
        <h2 className="mb-4 text-slate-400 font-medium">Operational years</h2>
        <span className="flex items-center gap-2 text-slate-100">
          <Calendars size={20} className="text-slate-500" />
          <p className="font-medium text-base">8 years</p>
        </span>
      </div>
      <div className="bg-[#0B1220] text-sm px-6 py-5 rounded-md border border-slate-800 w-full flex flex-col justify-between">
        <h2 className="mb-4 text-slate-400 font-medium">Total Users</h2>
        <span className="flex items-center gap-2 text-slate-100">
          <Users size={20} className="text-slate-500" />
          <p className="font-medium text-base">5 users</p>
        </span>
      </div>
    </div>
  );
}
