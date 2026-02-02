export default function CompanyGoals() {
  return (
    <div className="mt-8 bg-white shadow-lg border border-gray-300 px-6 pb-6 rounded-lg">
      <div className="mt-6 ">
        <h2 className="text-base text-gray-900 font-bold mb-1">
          Mission and Goals
        </h2>
        <p className="text-sm text-gray-600 ">Mission and Expected Outcomes</p>
      </div>
      <div className="flex flex-col  mt-6  ">
        <div className="flex flex-col mb-4">
          <h2 className="text-sm text-gray-900 mb-2">Company&#39;s Mission</h2>
          <p className="text-sm text-gray-600 ">
            Our mission is to empower individuals and businesses with
            innovative, reliable solutions that simplify their daily operations
            and unlock new opportunities for growth. We are committed to
            delivering exceptional value through integrity, customer-focused
            service, and continuous improvement in everything we do.
          </p>
        </div>
        <div className=" border-t  border-gray-400"></div>
        <div className="mt-4 mb-4">
          <h2 className="text-sm text-gray-900 mb-2">Expections</h2>
          <p className="text-sm text-gray-600">
            We expect every team member to uphold our core values of integrity,
            collaboration, and accountability in all aspects of their work. The
            company also expects employees to consistently strive for
            excellence, embrace innovation, and contribute to a positive and
            productive work environment.
          </p>
        </div>
      </div>
    </div>
  );
}
