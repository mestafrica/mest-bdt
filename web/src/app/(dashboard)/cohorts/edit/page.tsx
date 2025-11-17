import { UploadCloud } from "lucide-react";

export default function EditCohort() {
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-[#1E2939] rounded-2xl shadow-md p-8 w-full max-w-5xl flex flex-col h-[80vh]">
        {/* Header on top */}
        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Cohort</h2>
        <div className="flex flex-col md:flex-row flex-1 space-y-6 md:space-y-0 md:space-x-8">
          {/* Left: Upload Box */}
          <div className="flex-1 border-2 border-dashed border-blue-300 rounded-xl flex flex-col items-center justify-center text-center p-6">
            <div className="text-blue-500 mb-2">
              <UploadCloud height={32} width={40} />
            </div>
            <p className="text-gray-700 font-medium mb-1">
              Change cohort image
            </p>
            <p className="text-gray-500 mb-2">OR</p>
            <label className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition cursor-pointer">
              Upload New Image
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-400 mt-2">
              Only PNG, JPG and PDF files are supported
            </p>
          </div>

          {/* Right: Edit Form */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2 text-sm">
                  Cohort Name
                </label>
                <input
                  type="text"
                  defaultValue="Existing Cohort Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2 text-sm">
                  Description
                </label>
                <textarea
                  defaultValue="Existing cohort description"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 focus:ring-2 focus:ring-blue-400 outline-none"
                ></textarea>
              </div>
            </div>
            {/* Save Changes & Cancel Buttons */}
            <div className="flex justify-end gap-3">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
                Save Changes
              </button>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
