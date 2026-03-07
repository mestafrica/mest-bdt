import { Mail, Phone, User } from "lucide-react";

export default function CompanyContactInfo() {
  const contacts = [
    {
      role: "Primary Contact",
      name: "Sarah Ayitey",
      email: "saraha@gmail.com",
      phone: "+233 (023) 2345",
    },
    {
      role: "Alternative Contact",
      name: "John Doe",
      email: "johnd@gmail.com",
      phone: "+233 (024) 5678",
    },
  ];

  return (
    <div className="card-meltwater p-8 w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <User className="text-primary" size={20} />
        </div>
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          Contact Information
        </h2>
      </div>

      <div className="space-y-10">
        {contacts.map((contact, index) => (
          <div key={index} className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-widest leading-none">
                {contact.role}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                  Full Name
                </p>
                <p className="text-sm font-bold text-foreground">
                  {contact.name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                  Email Address
                </p>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <Mail size={14} className="text-primary" />
                  <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4">
                    {contact.email}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                  Phone Number
                </p>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-primary" />
                  <p className="text-sm font-bold text-foreground">
                    {contact.phone}
                  </p>
                </div>
              </div>
            </div>
            {index === 0 && <div className="border-b border-border/50 pt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}
