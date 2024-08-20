import React from 'react';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');  // Navigate to the login page
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to FitArticles</h1>
      <p className="text-lg mb-8">Your daily dose of fitness inspiration</p>
      <button 
        onClick={handleLoginClick} 
        className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-700 transition">
        Log In
      </button>
    </div>
  );
};

export default LandingPage;
