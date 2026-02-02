export default function OrganizationProfile() {
  return (
    <div className="bg-white rounded-lg px-6 py-6 border border-gray-300 w-full">
      <div className="mb-4">
        <h2 className="text-base text-gray-900 font-semibold mb-2">
          Organization Profile
        </h2>
        <div className=" border-t  border-gray-200"></div>
        <p className="text-sm mt-2 text-gray-600">
          Business Operation Overview
        </p>
      </div>

      <div>
        <h2 className="text-sm mt-2 text-gray-900 font-bold">
          Project Manager
        </h2>
        <p className="text-sm mt-2 text-gray-900 mb-4">Eramus Konney</p>
      </div>

      <div className=" border-t  border-gray-400"></div>
      {/* Key Data Fields */}
      <div className="space-y-4 mt-4 mb-2">
        <div>
          <h2 className="text-sm mt-2 text-gray-900 ">
            Total Number of Employees
          </h2>
          <p className="text-sm mt-2 text-gray-900 mb-4">60</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-800 font-medium">
            Key Organizational Units
          </h3>
          <p className="text-sm text-gray-700">10</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-800 font-medium">
            Product / Service
          </h3>
          <p className="text-sm text-gray-700">Technology</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-800 font-medium">Annual Revenue</h3>
          <p className="text-sm text-gray-700">$16.0M</p>
        </div>
      </div>
    </div>
  );
}
