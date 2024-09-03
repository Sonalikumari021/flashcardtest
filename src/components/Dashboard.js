import React, { useState} from "react";
import QuesPage from "./QuesPage";

const Dashboard = () => {
  const [startTest, setStartTest] = useState(false);
  
  if (startTest) {
    return <QuesPage/>;
  }

  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Begin your test by clicking Start</h2>
        <button
          onClick={() => setStartTest(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
