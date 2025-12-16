"use client";
import Image from "next/image";
import { useUser } from "@/hooks/user";
import useSWR from "swr";
import { apiClient, apiFetcher } from "@/utils/api";
import SubmitButton from "../core/SubmitButton";
import toast from "react-hot-toast";

export default function CompanyInfo() {
  const { user } = useUser();
  const { data, mutate } = useSWR(`/companies/${user?.company}`, apiFetcher);

  const handleSubmit = async (data: FormData) => {
    try {
      await apiClient.patch(`/companies/${user?.company}`, {
        name: data.get("name"),
        mainPointOfContact: data.get("mainPointOfContact"),
        altPointOfContact: data.get("altPointOfContact"),
        projectManager: data.get("projectManager"),
        keyOrgUnits: data.get("keyOrgUnits"),
        sector: data.get("sector"),
        productOrService: data.get("productOrService"),
        annualRevenue: data.get("annualRevenue"),
        operationalYears: data.get("operationalYears"),
        totalUsers: data.get("totalUsers"),
        totalEmployees: data.get("totalEmployees"),
        expectation: data.get("expectation"),
        mission: data.get("mission"),
      });
      toast.success("Company updated successfully");
      await mutate();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update company");
    }
  };

  return (
    <>
      {/* BANNER */}
      <div className="bg-white dark:bg-[#1a1d24] p-6 rounded-2xl shadow mb-8">
        <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4">
          <Image
            src="https://i.pinimg.com/1200x/53/bb/a5/53bba57fcb64c79582f30c913c2eb7f4.jpg"
            alt="Company Banner"
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <button className="text-sm px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700">
          Change Image
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white dark:bg-[#1a1d24] p-6 rounded-2xl shadow">
        <form
          autoComplete="off"
          action={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Column 1 */}
          <div className="space-y-4">
            <label className="block text-sm">
              Company Name
              <input
                type="text"
                name="name"
                defaultValue={data?.name}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>

            <label className="block text-sm">
              Main Contact
              <input
                type="text"
                name="mainPointOfContact"
                defaultValue={data?.mainPointOfContact}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>

            <label className="block text-sm">
              Alt Contact
              <input
                type="text"
                name="altPointOfContact"
                defaultValue={data?.altPointOfContact}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>

            <label className="block text-sm">
              Project Manager
              <input
                type="text"
                name="projectManager"
                defaultValue={data?.projectManager}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <label className="block text-sm">
              Key Org Units
              <input
                type="number"
                name="keyOrgUnits"
                defaultValue={data?.keyOrgUnits}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>

            <label className="block text-sm">
              Sector
              <input
                type="text"
                name="sector"
                defaultValue={data?.sector}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>

            <label className="block text-sm">
              Product / Service
              <input
                type="text"
                name="productOrService"
                defaultValue={data?.productOrService}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>

            <label className="block text-sm">
              Annual Revenue
              <input
                type="number"
                name="annualRevenue"
                defaultValue={data?.annualRevenue}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <label className="block text-sm">
              Operational Years
              <input
                type="number"
                name="operationalYears"
                defaultValue={data?.operationalYears}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>

            <label className="block text-sm">
              Total Users
              <input
                type="number"
                name="totalUsers"
                defaultValue={data?.totalUsers}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>

            <label className="block text-sm">
              Total Employees
              <input
                type="number"
                name="totalEmployees"
                defaultValue={data?.totalEmployees}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>

            <label className="block text-sm">
              Expectation
              <input
                type="text"
                name="expectation"
                defaultValue={data?.expectation}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>
          </div>

          {/* Mission */}
          <div className="lg:col-span-3">
            <label className="block text-sm">
              Mission
              <textarea
                rows={4}
                name="mission"
                defaultValue={data?.mission}
                className="mt-1 w-full px-3 py-2 rounded-lg border dark:bg-[#0f1113]"
              />
            </label>
          </div>

          {/* Save Changes Button */}
          <div className="lg:col-span-3 flex justify-end">
            <SubmitButton title="Save Changes" />
          </div>
        </form>
      </div>
    </>
  );
}
