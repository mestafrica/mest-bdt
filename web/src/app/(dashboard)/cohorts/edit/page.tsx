import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditCohort() {
  return (
    <div className="bg-gray-100 rounded-lg p-4 sm:p-6 w-full min-h-screen flex ">
      <div className="w-full ">
        <div className="inline-block">
          {/* Back Navigation */}
          <Link
            href={"/cohorts/view"}
            className="flex items-center gap-2 rounded-lg text-sm text-black hover:bg-gray-300 px-3 py-2 transition-all duration-200"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Back to cohorts
          </Link>
        </div>

        {/* Edit Cohort Form */}
        <div className="mt-6 bg-white p-4 sm:p-6 shadow-lg rounded-lg text-black">
          <h1 className="text-xl font-bold text-center sm:text-left">
            Edit Cohort
          </h1>
          <p className="mt-2 text-gray-700 text-sm text-center sm:text-left">
            Update cohort information by filling this form{" "}
            <span className="text-black">!</span>
          </p>
          <div className="w-full mx-auto mt-6">
            <form className="space-y-6 mt-4">
              {/* Cohort Name */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 font-semibold">
                  Cohort Name
                  <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="2025 Spring Cohort"
                  className="bg-gray-200 px-2 py-3 rounded-lg text-sm border border-gray-400"
                />
              </div>
              {/* Cohort Description */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 font-semibold">
                  Cohort Description
                  <span className="text-red-700">*</span>
                </label>
                <textarea
                  defaultValue="2025 Spring cohort for EdTech..."
                  className="bg-gray-100 px-2 py-3 rounded-lg text-sm border border-gray-400"
                  rows={5}
                />
              </div>
              {/* Upload Image */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 font-semibold">
                  Upload Image
                  <span className="text-gray-400 ml-1">(Optional)</span>
                </label>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="bg-gray-100 px-2 py-3 rounded-lg text-sm  border border-gray-400"
                />
              </div>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
                <button className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer w-full sm:w-auto">
                  Save Changes
                </button>
                <div className="px-4 py-2 rounded-lg border border-gray-600 cursor-pointer w-full sm:w-auto text-center">
                  Cancel
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
