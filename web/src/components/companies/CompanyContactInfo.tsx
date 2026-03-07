import { Mail, Phone } from "lucide-react";

export default function CompanyContactInfo() {
  return (
    <div className="bg-[#0B1220] rounded-md px-6 py-6 border border-slate-800 w-full">
      <div className="mb-4 text-slate-200">
        <h2 className="text-lg font-medium mb-1">
          Contact Information
        </h2>
      </div>
      <div className="border-t border-slate-800 mb-4"></div>
      
      <div className="mb-6">
        <p className="text-slate-400 text-sm mb-4">
          Primary contact for this company
        </p>
        <h2 className="text-sm text-slate-500">Contact Person</h2>
        <p className="text-sm font-medium text-slate-200 mt-1">Sarah Ayitey</p>

        <div className="mt-4">
          <h2 className="text-sm text-slate-500">Email Address</h2>
          <span className="flex gap-2 items-center mt-1">
            <Mail size={16} className="text-slate-400" />
            <p className="text-sm text-blue-400 hover:text-blue-300 hover:underline cursor-pointer transition-colors">
              saraha@gmail.com
            </p>
          </span>
        </div>
        <div className="mt-4">
          <h2 className="text-sm text-slate-500">Phone Number</h2>
          <span className="flex items-center gap-2 mt-1">
            <Phone size={16} className="text-slate-400" />
            <p className="text-sm text-slate-300">+233 (023) 2345</p>
          </span>
        </div>
      </div>
      
      <div className="border-t border-slate-800 mb-4"></div>

      <div className="mt-4">
        <p className="text-slate-400 text-sm mb-4">Alternative contact</p>

        <div className="mb-4">
          <h2 className="text-sm text-slate-500">
            Contact Person
          </h2>
          <p className="text-sm font-medium text-slate-200 mt-1">
            Sarah Ayitey
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-sm text-slate-500">Email Address</h2>
          <span className="flex gap-2 items-center mt-1">
            <Mail size={16} className="text-slate-400" />
            <p className="text-sm text-blue-400 hover:text-blue-300 hover:underline cursor-pointer transition-colors">
              saraha@gmail.com
            </p>
          </span>
        </div>
        <div className="mt-4">
          <h2 className="text-sm text-slate-500">Phone Number</h2>
          <span className="flex items-center gap-2 mt-1">
            <Phone size={16} className="text-slate-400" />
            <p className="text-sm text-slate-300">+233 (023) 2345</p>
          </span>
        </div>
      </div>
    </div>
  );
}
