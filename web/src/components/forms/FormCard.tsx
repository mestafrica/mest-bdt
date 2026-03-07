import { Form } from "@/utils/types";
import { Eye, Edit } from "lucide-react";
import Link from "next/link";
import { CopyPlus } from "lucide-react";

export interface FormCardProps {
  form: Form;
}

export default function FormCard({ form }: FormCardProps) {
  return (
    <div className="bg-[#0b1220] rounded-md overflow-hidden border border-slate-800 shadow-sm flex flex-col">
      {/* Placeholder Image / Pattern */}
      <div className="relative h-32 w-full bg-slate-900 flex items-center justify-center transform transition-transform duration-300 hover:scale-105 border-b border-slate-800">
        <CopyPlus className="h-12 w-12 text-slate-700" />
      </div>
      {/* Card Details */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name and Description*/}
        <div>
          <h2 className="text-slate-100 font-medium">{form.name}</h2>
          <p className="text-sm text-slate-400 mt-1 line-clamp-3">
            {form.description}
          </p>
        </div>
        <div className="flex-1" />
        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/50">
          <Link href={`/forms/view?id=${form.id || (form as { _id?: string })._id}`}>
            <button className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm flex items-center gap-2 cursor-pointer transition-colors">
              <Eye className="h-4 w-4" /> View
            </button>
          </Link>
          <Link href={`/forms/edit?id=${form.id || (form as { _id?: string })._id}`}>
            <button className="px-3 py-1.5 rounded-md border text-slate-100 border-slate-700 hover:bg-slate-800 text-sm flex items-center gap-2 cursor-pointer transition-colors">
              <Edit className="h-4 w-4" /> Edit
            </button>
          </Link>
        </div>
        {/* Dates */}
        {(form.createdAt || form.updatedAt) && (
          <div className="mt-4 text-xs text-slate-500 flex justify-between">
            {form.createdAt && (
              <span>Created {new Date(form.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
