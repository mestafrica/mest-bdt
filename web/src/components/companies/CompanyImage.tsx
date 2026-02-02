import Image from "next/image";

export default function CompanyImage() {
  return (
    <div className="relative mt-8 mb-10 h-[400px] w-full">
      <Image
        src="https://i.pinimg.com/1200x/a3/51/30/a35130edc8113b0b747ed58f84fa3f8c.jpg"
        alt="Company Image"
        fill
        quality={100}
        className="rounded-2xl object-cover shadow-md"
      />
    </div>
  );
}
