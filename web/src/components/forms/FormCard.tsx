"use client";
import { Form } from "@/utils/types";
import { Eye, Edit, FileText, Calendar } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

export interface FormCardProps {
  form: Form;
}

export default function FormCard({ form }: FormCardProps) {
  const formId = form.id || (form as { _id?: string })._id;

  return (
    <div className="card-meltwater group hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
      {/* Icon Area */}
      <div className="p-6 pb-2">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
          <FileText size={24} />
        </div>
      </div>

      <div className="p-6 pt-2 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {form.name}
          </h3>
          <p className="text-foreground/50 text-xs mt-2 line-clamp-2 font-medium leading-relaxed">
            {form.description ||
              "No description provided for this form template."}
          </p>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex items-center gap-2 pt-4 border-t border-foreground/5">
            <Calendar size={12} className="text-foreground/30" />
            <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
              Created{" "}
              {form.createdAt
                ? dayjs(form.createdAt).format("MMM DD, YYYY")
                : "Recently"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link href={`/forms/view?id=${formId}`} className="w-full">
              <button className="w-full h-10 rounded-xl bg-foreground/5 hover:bg-primary hover:text-primary-foreground text-foreground/60 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                <Eye size={14} />
                View
              </button>
            </Link>
            <Link href={`/forms/edit?id=${formId}`} className="w-full">
              <button className="w-full h-10 rounded-xl border border-foreground/10 hover:border-primary/30 text-foreground/60 hover:text-primary text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                <Edit size={14} />
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
