"use client";
import React from "react";
import dayjs from "dayjs";

const DashboardHeader = () => {
  const currentDate = dayjs().format("MMMM D, YYYY");

  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-foreground tracking-tight">
        Dashboard Overview
      </h1>
      <p className="text-foreground/50 text-sm mt-1 font-medium">
        Today is {currentDate}
      </p>
    </div>
  );
};

export default DashboardHeader;
