export default function OrganizationProfile() {
  return (
    <div className="bg-[#0B1220] rounded-md px-6 py-6 border border-slate-800 w-full">
      <div className="mb-4 text-slate-200">
        <h2 className="text-lg font-medium mb-1">
          Organization Profile
        </h2>
      </div>
      <div className="border-t border-slate-800 mb-4"></div>
      <p className="text-sm text-slate-400 mb-6">
        Business Operation Overview
      </p>

      <div className="mb-6">
        <h2 className="text-sm text-slate-500">
          Project Manager
        </h2>
        <p className="text-sm font-medium text-slate-200 mt-1 mb-4">Eramus Konney</p>
      </div>

      <div className="border-t border-slate-800 mb-6"></div>
      {/* Key Data Fields */}
      <div className="space-y-6">
        <div>
          <h2 className="text-sm text-slate-500">
            Total Number of Employees
          </h2>
          <p className="text-sm font-medium text-slate-200 mt-1">60</p>
        </div>

        <div>
          <h3 className="text-sm text-slate-500">
            Key Organizational Units
          </h3>
          <p className="text-sm font-medium text-slate-200 mt-1">10</p>
        </div>

        <div>
          <h3 className="text-sm text-slate-500">
            Product / Service
          </h3>
          <p className="text-sm font-medium text-slate-200 mt-1">Technology</p>
        </div>

        <div>
          <h3 className="text-sm text-slate-500">Annual Revenue</h3>
          <p className="text-sm font-medium text-slate-200 mt-1">$16.0M</p>
        </div>
      </div>
    </div>
  );
}
