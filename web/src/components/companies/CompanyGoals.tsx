import { Target, Lightbulb, CheckCircle2 } from "lucide-react";

export default function CompanyGoals() {
  return (
    <div className="card-meltwater p-8 w-full border-primary/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Target className="text-primary" size={20} />
        </div>
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          Mission and Goals
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Lightbulb size={18} className="text-primary" />
            <h3 className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
              Company&apos;s Mission
            </h3>
          </div>
          <p className="text-sm font-medium text-foreground/70 leading-relaxed border-l-2 border-primary/20 pl-6 italic">
            &quot;Our mission is to empower individuals and businesses with
            innovative, reliable solutions that simplify their daily operations
            and unlock new opportunities for growth. We are committed to
            delivering exceptional value through integrity, customer-focused
            service, and continuous improvement in everything we do.&quot;
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-primary" />
            <h3 className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
              Expectations & Outcomes
            </h3>
          </div>
          <p className="text-sm font-medium text-foreground/70 leading-relaxed border-l-2 border-primary/20 pl-6">
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
