import { Building2, Users, Award, TrendingUp } from "lucide-react";

export default function CompanyStats() {
  const stats = [
    { label: "Sector", value: "Technology", icon: Building2 },
    { label: "Company Size", value: "250+ Employees", icon: Award },
    { label: "Operational", value: "8 Years", icon: TrendingUp },
    { label: "Total Users", value: "12 Members", icon: Users },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="card-meltwater p-6 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              {stat.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
