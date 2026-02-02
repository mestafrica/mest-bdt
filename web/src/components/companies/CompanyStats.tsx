import { Building2, Users, Calendars, IdCardLanyard } from "lucide-react";

export default function CompanyStats() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
      <div className="bg-white shadow-lg text-sm px-6 py-4 rounded-2xl border border-gray-300  w-full">
        <h2 className=" mb-10 text-gray-950 font-bold">Sector</h2>
        <span className="flex items-center gap-2">
          <Building2 size={20} />
          <p>Technology</p>
        </span>
      </div>
      <div className="bg-white shadow-lg text-sm px-6 py-4 rounded-2xl border border-gray-300   w-full">
        <h2 className="mb-10 text-gray-950 font-bold">Company size</h2>
        <span className="flex items-center gap-2">
          <IdCardLanyard size={20} />
          <p>250 employees</p>
        </span>
      </div>
      <div className="bg-white shadow-lg px-6 text-sm  py-4 rounded-2xl border border-gray-300   w-full">
        <h2 className="mb-10 text-gray-950  font-bold">Operational years</h2>
        <span className="flex items-center gap-2">
          <Calendars size={20} />
          <p>8 years</p>
        </span>
      </div>
      <div className="bg-white shadow-lg text-sm px-6 py-4 rounded-2xl border border-gray-300  w-full">
        <h2 className="mb-10 text-gray-950 font-bold">Total Users</h2>
        <span className="flex items-center gap-2">
          <Users size={20} />
          <p>5 users</p>
        </span>
      </div>
    </div>
  );
}
