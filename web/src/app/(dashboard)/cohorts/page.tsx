import { Eye, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Cohorts() {
  return (
    <>
      <div className=" bg-gray-200 p-8 rounded-md text-black">
        {/* Page Header + Search + Add Button */}
        <div className="w-full mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: Header Title */}
          <h1 className="text-2xl font-bold text-white-800">Cohort Details</h1>

          {/* Right: Search + Add Button Group */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search cohorts..."
                className="w-full pl-10 pr-4 py-2 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Add Cohort Button */}
            <Link
              href="/cohorts/add"
              className="bg-blue-600 whitespace-nowrap text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium"
            >
              Add Cohort
            </Link>
          </div>
        </div>

        {/* Cohort Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full mb-6">
          {/*Card 1 */}
          <div className="border border-blue-200 rounded-lg overflow-hidden bg-white shadow-md">
            <div className="relative w-full h-64">
              <Image
                src="https://i.pinimg.com/1200x/40/6d/46/406d46cfab7c97768870aaf287d89b5b.jpg"
                alt="Cohort 1"
                width={500}
                height={500}
                className="object-cover w-full h-full rounded-md"
              />

              {/* Icons */}
              <div className="absolute top-2 right-2 flex space-x-4">
                <Link
                  href="/cohorts/view?id=1"
                  className="p-2 bg-white/30 rounded-md backdrop-blur-sm  hover:scale-110 transition"
                >
                  <Eye className="h-6 w-6 text-[#432DD7]" />
                </Link>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Cohort 1</h3>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                Our EdTech Teacher Empowerment program is designed to help
                educators seamlessly integrate technology into their classrooms.
                Participants learn to use digital tools for lesson planning,
                assessment, and student engagement.
              </p>
              <button className="text-blue-600 cursor-pointer text-sm underline mt-2 hover:text-blue-800">
                Read more
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-blue-200 rounded-lg overflow-hidden bg-white shadow-md">
            <div className="relative w-full h-64">
              <Image
                src="https://i.pinimg.com/736x/9c/b1/44/9cb14497febb1e5f84a64b707e994b7e.jpg"
                alt="Cohort 1"
                width={500}
                height={500}
                className="object-cover w-full h-full rounded-md"
              />

              {/* Icons */}
              <div className="absolute top-2 right-2 flex space-x-4">
                <Link
                  href="/cohorts/view?id=1"
                  className="p-2 bg-white/30 rounded-md backdrop-blur-sm  hover:scale-110 transition"
                >
                  <Eye className="h-6 w-6 text-[#432DD7]" />
                </Link>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Cohort 2</h3>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                The Coding for Kids initiative introduces children to
                programming through hands-on activities and games. Young
                learners explore basic coding concepts using visual languages
                and block-based platforms. The program encourages creativity,
                logical thinking, and teamwork as students build simple apps and
                animations.
              </p>
              <button className="text-blue-600 text-sm underline mt-2 hover:text-blue-800">
                Read more
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-blue-200 rounded-lg overflow-hidden bg-white shadow-md">
            <div className="relative w-full h-64  overflow-hidden">
              <Image
                src="https://i.pinimg.com/736x/36/c9/9b/36c99b445865431cefaa51e7b91ffc99.jpg"
                alt="Cohort 1"
                width={500}
                height={500}
                className="object-cover rounded-md h-full w-full"
              />

              {/* Icons */}
              <div className="absolute top-2 right-2 flex space-x-4">
                <Link
                  href="/cohorts/view?id=1"
                  className="p-2 bg-white/30 rounded-md backdrop-blur-sm  hover:scale-110 transition"
                >
                  <Eye className="h-6 w-6 text-[#432DD7]" />
                </Link>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Cohort 3</h3>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                Our Online Learning Platform offers flexible, self-paced courses
                in mathematics, science, and digital literacy. Students access
                interactive lessons, video tutorials, and quizzes from any
                device, making learning accessible and convenient.
              </p>
              <button className="text-blue-600 text-sm underline mt-2 hover:text-blue-800">
                Read more
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="border border-blue-200 rounded-lg overflow-hidden bg-white shadow-md">
            <div className="relative w-full h-64">
              <Image
                src="https://i.pinimg.com/736x/49/f9/65/49f9657b4889e617d16138e05c121d95.jpg"
                alt="Cohort 1"
                width={500}
                height={500}
                className="object-cover rounded-md w-full h-full"
              />

              {/* Icons */}
              <div className="absolute top-2 right-2 flex space-x-4">
                <Link
                  href="/cohorts/view?id=1"
                  className="p-2 bg-white/30 rounded-md backdrop-blur-sm  hover:scale-110 transition"
                >
                  <Eye className="h-6 w-6 text-[#432DD7]" />
                </Link>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Cohort 4</h3>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                The Teacher Training Bootcamp is a comprehensive program focused
                on modern pedagogical strategies and digital literacy. Educators
                participate in workshops on blended learning, classroom
                management, and data-driven instruction. The bootcamp..
              </p>
              <button className="text-blue-600 text-sm underline mt-2 hover:text-blue-800">
                Read more
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
