import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
  
      <div className="w-64 h-64 bg-gray-200 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center shadow-md">
        <img
          src="download.png" 
          alt="Home illustration"
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      <h1 className="mt-8 text-2xl font-semibold text-gray-700">
        Welcome to the review system
      </h1>
      <p className="text-gray-500 mt-2">Every review matters</p>
    </div>
  );
};

export default Home;
