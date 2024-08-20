import React from 'react';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');  // Navigate to the login page
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white font-poppins">
      <h2 className="text-6xl font-medium mb-4 text-center">Shape Your</h2>
      <h1 className="text-9xl font-bold mb-8">Body. Mind. <span className='text-cyan-300'>Future.</span></h1>
      <button
        onClick={handleLoginClick}
        className="px-20 py-8 text-xl bg-black border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in-out duration-300">
        Breathe in
      </button>
    </div>
  );
};

export default LandingPage;
