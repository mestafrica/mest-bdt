export default function CompanyGoals() {
  return (
    <div className="bg-[#0B1220] rounded-md px-6 py-6 border border-slate-800 w-full">
      <div className="mb-4 text-slate-200">
        <h2 className="text-lg font-medium mb-1">
          Mission and Goals
        </h2>
      </div>
      <div className="border-t border-slate-800 mb-4"></div>
      <p className="text-sm text-slate-400 mb-6">Mission and Expected Outcomes</p>
      
      <div className="flex flex-col">
        <div className="flex flex-col mb-6">
          <h2 className="text-sm text-slate-500 mb-2">Company&#39;s Mission</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Our mission is to empower individuals and businesses with
            innovative, reliable solutions that simplify their daily operations
            and unlock new opportunities for growth. We are committed to
            delivering exceptional value through integrity, customer-focused
            service, and continuous improvement in everything we do.
          </p>
        </div>
        
        <div className="border-t border-slate-800 mb-6"></div>
        
        <div className="flex flex-col mb-4">
          <h2 className="text-sm text-slate-500 mb-2">Expectations</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We expect every team member to uphold our core values of integrity,
            collaboration, and accountability in all aspects of their work. The
            company also expects employees to consistently strive for
            excellence, embrace innovation, and contribute to a positive and
            productive work environment.
          </p>
        </div>
      </div>
    </div>
  );
}
