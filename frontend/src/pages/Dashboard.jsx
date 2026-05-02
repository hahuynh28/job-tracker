import React from "react";
import ApplicationCard from "../components/ApplicationCard";

const Dashboard = () => {
  return (
    <div className="h-[calc(100vh-72px)] p-4 overflow-hidden">
      {" "}
      {/* outer container with padding */}
      <div className="grid grid-cols-[20%_55%_25%] gap-4 h-full">
        {" "}
        {/* grid container */}
        <div className="bg-surface rounded-lg p-4 h-full">Left - Filters</div>
        <div className=" rounded-lg p-4 overflow-y-auto h-full">
          <ApplicationCard />
        </div>
        <div className="bg-surface rounded-lg p-4 h-full">Right - Stats</div>
      </div>
    </div>
  );
};

export default Dashboard;
