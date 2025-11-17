import Image from "next/image";
import Link from "next/link";

export default function ViewCohortPage() {
  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-100 dark:bg-[#0b0c10] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
          Cohort Details
        </h1>

        <div className="flex flex-wrap gap-3">
          <Link
            href={"/cohorts/edit?id=1"}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Edit Cohort
          </Link>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition">
            Delete Cohort
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative mb-10">
        <Image
          src="https://i.pinimg.com/1200x/2f/94/e1/2f94e1314b23dda5338f32b587489d90.jpg"
          alt="Cohort Image"
          width={1200}
          height={500}
          quality={100}
          className="rounded-2xl object-cover shadow-md"
        />
        <p className="absolute top-5 left-5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
          Active
        </p>
      </div>

      {/* Summary Section */}
      <div className="bg-white dark:bg-[#1a1d24] p-6 rounded-2xl shadow-md mb-10">
        <h2 className="text-lg font-semibold mb-5 text-gray-800 dark:text-gray-200">
          Summary Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Cohort Name</p>
            <p className="font-semibold">MEST Cohort 2025</p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400">Program</p>
            <p className="font-semibold">Tech for Growth</p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400">Start Date</p>
            <p className="font-semibold">January 10, 2025</p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400">End Date</p>
            <p className="font-semibold">July 28, 2025</p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400">Status</p>
            <p className="font-semibold text-green-600 dark:text-green-400">
              Active
            </p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400">
              Total Participants
            </p>
            <p className="font-semibold">25</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white dark:bg-[#1a1d24] p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Description
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          This cohort provides participants with technical and business-oriented
          training aimed at developing innovative solutions. Through mentorship
          and collaboration, members gain real-world experience and prepare to
          contribute meaningfully to technology and entrepreneurship in Africa.
        </p>
      </div>
    </div>
  );
}
