import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-background h-[calc(100vh-74px)] p-8">
      <div className="bg-surface rounded-lg p-6">
        <h1 className="text-text-primary text-2xl font-medium">Dashboard</h1>
        <p className="text-text-secondary">This is a card</p>
        <button className="bg-primary text-white px-4 py-2 rounded-md mt-4">
          Add Application
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
