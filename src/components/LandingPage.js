import React from 'react';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');  // Navigate to the login page
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white font-poppins">
      <h1 className="text-8xl font-bold mb-4 text-center">Shape Your</h1>
      <p className="text-xl mb-8">Body. Mind. <span className='text-cyan-300'>Future.</span></p>
      <button
        onClick={handleLoginClick}
        className="px-6 py-3 bg-black border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in-out duration-300">
        Breathe in
      </button>
    </div>
  );
};

export default LandingPage;
