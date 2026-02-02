import { Mail, Phone } from "lucide-react";

export default function CompanyContactInfo() {
  return (
    <div className="bg-white rounded-lg px-6 border  border-gray-300 w-full">
      <div className="mt-4 mb-4">
        <h2 className=" text-gray-900 text-base font-bold mb-1">
          {" "}
          Contact Information
        </h2>
      </div>
      <div className=" border-t  border-gray-200"></div>
      <div className="mt-2 mb-4 ">
        <p className="text-gray-600 text-sm mb-3">
          Primary contact for this company
        </p>
        <h2 className=" text-sm text-gray-600 font-normal ">Contact Person</h2>
        <p className="text-sm font-semibold text-gray-900 mt-2">Sarah Ayitey</p>

        <div className="mt-2 mb-4 ">
          <h2 className="text-sm text-gray-600 font-normal">Email Address</h2>
          <span className="flex gap-2 items-center mt-2">
            <Mail size={16} />
            <p className="text-sm text-blue-600 hover:underline cursor-pointer ">
              {" "}
              saraha@gmail.com
            </p>
          </span>
        </div>
        <div className="mt-4 ">
          <h2 className="text-sm text-blue-600l">Phone Number</h2>
          <span className="flex items-center  gap-2">
            <Phone size={16} />
            <p className="text-sm text-blue-700">+233 (023)(2345)</p>
          </span>
        </div>
      </div>
      <div className="border-t border-gray-400"></div>

      <div className="mt-4">
        <p className="text-gray-600 text-sm">Alternative contact</p>

        <div className="mt-2 mb-4">
          <h2 className=" text-sm text-gray-600 font-normal ">
            Contact Person
          </h2>
          <p className="text-sm font-semibold text-gray-900 mt-2">
            Sarah Ayitey
          </p>
        </div>

        <div className="mt-2 mb-4 ">
          <h2 className="text-sm text-gray-600 font-normal">Email Address</h2>
          <span className="flex gap-2 items-center mt-2">
            <Mail size={16} />
            <p className="text-sm text-blue-600 hover:underline cursor-pointer ">
              {" "}
              saraha@gmail.com
            </p>
          </span>
        </div>
        <div className="mt-4 mb-4">
          <h2 className="text-sm text-blue-600l">Phone Number</h2>
          <span className="flex items-center  gap-2">
            <Phone size={16} />
            <p className="text-sm text-blue-700">+233 (023)(2345)</p>
          </span>
        </div>
      </div>
    </div>
  );
}
