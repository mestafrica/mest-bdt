import {
  PieChart,
  Briefcase,
  DollarSign,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function OrganizationProfile() {
  const profileItems = [
    { label: "Project Manager", value: "Eramus Konney", icon: ShieldCheck },
    { label: "Total Employees", value: "60 Persons", icon: Users },
    { label: "Organizational Units", value: "12 Departments", icon: PieChart },
    { label: "Revenue Range", value: "$5.0M - $10.0M", icon: DollarSign },
  ];

  return (
    <div className="card-meltwater p-8 w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Briefcase className="text-primary" size={20} />
        </div>
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          Organization Profile
        </h2>
      </div>

      <p className="text-sm font-medium text-foreground/40 mb-10 leading-relaxed">
        Key details regarding the business operations and structural overview of
        the organization.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
        {profileItems.map((item) => (
          <div key={item.label} className="space-y-2 flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <item.icon size={14} className="text-primary" />
              <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                {item.label}
              </span>
            </div>
            <p className="text-sm font-bold text-foreground pl-5 border-l-2 border-primary/20">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-border">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">
            Core Product/Service
          </span>
          <p className="text-sm font-bold text-foreground italic">
            &quot;Cloud-based Enterprise Resource Planning Software for
            SMEs&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
