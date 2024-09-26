import React from 'react';

const UniqueLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <svg
        className="w-24 h-24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="#4F46E5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="#FF6600"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};

export default UniqueLoader;