import { Trash2, Search, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Cohorts() {
  return (
    <>
      <div className="flex flex-col px-2 rounded-lg shadow-md max-w-7xl mx-auto overflow-auto space-y-6 w-full sm:px-4 md:px-8 bg-[#1E2939]">
        {/* Title & Add Cohort Button */}
        <div className="flex items-center justify-between sm:justify-between mb-0.5">
          <h1 className="text-2xl my-4 mb-2 font-semibold text-gray-600 text-center sm:text-left">
            Cohort List
          </h1>
          <Link href={"/cohorts/add"}>
            <button className="bg-[#432DD7] hover:bg-blue-400 text-white px-4 py-1 rounded-md font-medium text-sm transition-colors cursor-pointer">
              Add Cohort
            </button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex  items-center my-4 sm:w-1/2">
          <div className="relative flex flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="h-3 w-4 text-gray-400" />
            </span>
            <input
              className="w-1/2 pl-8 pr-2 rounded-sm border-0 outline-blue-700 h-6.5 text-gray-600 placeholder:text-gray-400 bg-gray-100 text-sm"
              type="text"
              placeholder="Search cohorts..."
            />
          </div>
        </div>

        {/* Cohort Cards */}
        <div className="grid gap-4 flex-1 overflow-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-screen mb-4">
          {/* Card 1 */}
          <div className="border border-blue-200 rounded-md overflow-hidden bg-white mb-8">
            {/* Image Placeholder */}
            <div className="bg-blue-50 w-full h-48 object-contain">
              <Image
                src="https://i.pinimg.com/1200x/40/6d/46/406d46cfab7c97768870aaf287d89b5b.jpg"
                alt="Cohort 1"
                width={500}
                height={500}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-md font-semibold text-gray-800 mt-2.5">
                Cohort 1
              </h3>
              <p className="text-gray-600 text-sm">
                A group of talented entrepreneurs learning technology and
                business skills. This is a longer description to test card
                height consistency. Lorem ipsum, dolor sit amet consectetur
                adipisicing elit.
              </p>
              <button className="text-blue-600 text-xs underline w-fit hover:text-blue-800 cursor-pointer">
                Read more
              </button>
            </div>
            <div className="flex justify-end items-end mt-2">
              <Link
                href="/cohorts/view?id=1"
                className="p-2 hover:-translate-y-1 transition-all duration-300 flex items-center"
              >
                <Eye className="h-5 w-5 mr-[-12] text-[#432DD7]" />
              </Link>
              <button className="p-2 hover:-translate-y-1 transition-all duration-300">
                <Trash2 className="text-red-500 h-5 w-5 cursor-pointer" />
              </button>
            </div>
          </div>
          {/* Card 2 */}
          <div className="border border-blue-200 rounded-md overflow-hidden bg-white mb-8">
            <div className="bg-blue-50 w-full h-48 object-contain">
              <Image
                src="https://i.pinimg.com/1200x/40/6d/46/406d46cfab7c97768870aaf287d89b5b.jpg"
                alt="Cohort 2"
                width={500}
                height={500}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-md font-semibold text-gray-800 mt-2.5">
                Cohort 2
              </h3>
              <p className="text-gray-600 text-sm content-center">
                A group of talented entrepreneurs learning technology and
                business skills. This is a longer description to test card
                height consistency. Lorem ipsum, dolor sit amet consectetur
                adipisicing elit.
              </p>
              <button className="text-blue-600 text-xs underline w-fit hover:text-blue-800 cursor-pointer">
                Read more
              </button>
            </div>
            <div className="flex justify-end items-end mt-2">
              <Link
                href="/cohorts/view?id=2"
                className="p-2 hover:-translate-y-1 transition-all duration-300 flex items-center"
              >
                <Eye className="h-5 w-5 mr-[-12] text-[#432DD7]" />
              </Link>
              <button className="p-2 hover:-translate-y-1 transition-all duration-300">
                <Trash2 className="text-red-500 h-5 w-5 cursor-pointer" />
              </button>
            </div>
          </div>
          {/* Card 3 */}
          <div className="border border-blue-200 rounded-md overflow-hidden bg-white mb-8">
            <div className="bg-blue-50 w-full h-48 object-contain">
              <Image
                src="https://i.pinimg.com/1200x/40/6d/46/406d46cfab7c97768870aaf287d89b5b.jpg"
                alt="Cohort 3"
                className="object-fit w-full h-full rounded-md"
                width={500}
                height={500}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-md font-semibold text-gray-800 mt-2.5">
                Cohort 3
              </h3>
              <p className="text-gray-600 text-sm">
                Alumni cohort with established businesses and success stories.
                Success Stories everywhere Lorem ipsum dolor, sit amet
                consectetur adipisicing elit.
              </p>
              <button className="text-blue-600 text-xs underline w-fit hover:text-blue-800 cursor-pointer">
                Read more
              </button>
            </div>
            <div className="flex justify-end items-end mt-2 ">
              <Link
                href="/cohorts/view?id=3"
                className="p-2 hover:-translate-y-1 transition-all duration-300 flex items-center"
              >
                <Eye className="h-5 w-5 mr-[-12] text-[#432DD7]" />
              </Link>
              <button className="p-2 hover:-translate-y-1 transition-all duration-300">
                <Trash2 className="text-red-500 h-5 w-5 cursor-pointer" />
              </button>
            </div>
          </div>
          {/* Card 4 */}
          <div className="border border-blue-200 rounded-md overflow-hidden bg-white mb-8">
            <div className="bg-blue-50 w-full h-48 object-contain">
              <Image
                src="https://i.pinimg.com/1200x/40/6d/46/406d46cfab7c97768870aaf287d89b5b.jpg"
                alt="Cohort 3"
                className="object-fill w-full h-full rounded-md border-black-800 border-4"
                width={500}
                height={500}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-md font-semibold text-gray-800 mt-2.5">
                Cohort 4
              </h3>
              <p className="text-gray-600 text-sm">
                Alumni cohort with established businesses and success stories.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </p>
              <button className="text-blue-600 text-xs underline w-fit hover:text-blue-800 cursor-pointer">
                Read more
              </button>
            </div>
            <div className="flex justify-end items-end mt-2">
              <Link
                href="/cohorts/view?id=4"
                className="p-2 hover:-translate-y-1 transition-all duration-300 flex items-center"
              >
                <Eye className="h-5 w-5 mr-[-12] text-[#432DD7]" />
              </Link>
              <button className="p-2 hover:-translate-y-1 transition-all duration-300">
                <Trash2 className="text-red-500 h-5 w-5 cursor-pointer" />
              </button>
            </div>
          </div>
          {/* card 5 */}
          <div className="border border-blue-200 rounded-md overflow-hidden bg-white mb-8">
            <div className="bg-blue-50 w-full h-48 object-contain">
              <Image
                src="https://i.pinimg.com/1200x/40/6d/46/406d46cfab7c97768870aaf287d89b5b.jpg"
                alt="Cohort 2"
                className="object-fit w-full h-full rounded-md"
                width={400}
                height={250}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-md font-semibold text-gray-800 mt-2.5">
                Cohort 5
              </h3>
              <p className="text-gray-600 text-sm">
                Previous year&apos;s cohort with successful graduates and
                startups from EdTech. Lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </p>
              <button className="text-blue-600 text-xs underline w-fit hover:text-blue-800 cursor-pointer">
                Read more
              </button>
            </div>
            <div className="flex justify-end items-end mt-2">
              <Link
                href="/cohorts/view?id=5"
                className="p-2 hover:-translate-y-1 transition-all duration-300 flex items-center"
              >
                <Eye className="h-5 w-5 mr-[-12] text-[#432DD7]" />
              </Link>
              <button className="p-2 hover:-translate-y-1 transition-all duration-300">
                <Trash2 className="text-red-500 h-5 w-5 cursor-pointer" />
              </button>
            </div>
          </div>
          {/* Card 6 */}
          <div className="border border-blue-200 rounded-md overflow-hidden bg-white mb-8">
            <div className="bg-blue-50 w-full h-48 object-contain">
              <Image
                src="https://i.pinimg.com/1200x/40/6d/46/406d46cfab7c97768870aaf287d89b5b.jpg"
                alt="Cohort 6"
                className="object-cover w-full h-full rounded-md"
                width={400}
                height={200}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-md font-semibold text-gray-800 mt-2.5">
                Cohort 6
              </h3>
              <p className="text-gray-600 text-sm">
                Alumni cohort with established businesses and success stories.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </p>
              <button className="text-blue-600 text-xs underline w-fit hover:text-blue-800 cursor-pointer">
                Read more
              </button>
            </div>
            <div className="flex justify-end items-end mt-2">
              <Link
                href="/cohorts/view?id=6"
                className="p-2 hover:-translate-y-1 transition-all duration-300 flex items-center"
              >
                <Eye className="h-5 w-5 mr-[-12] text-[#432DD7]" />
              </Link>
              <button className="p-2 hover:-translate-y-1 transition-all duration-300">
                <Trash2 className="text-red-500 h-5 w-5 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
