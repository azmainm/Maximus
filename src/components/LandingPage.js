import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from '@/images/logo.png';

const LandingPage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');  // Navigate to the login page
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white font-poppins">
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={120} height={120} />
      </div>
      <h2 className="text-4xl font-medium mb-4 text-center">Shape Your</h2>
      <h1 className="text-7xl text-center font-bold mb-8">Body. Mind. <span className='text-cyan-300'>Future.</span></h1>
      <button
        onClick={handleLoginClick}
        className="px-14 py-6 text-xl bg-black border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in-out duration-300">
        Breathe in
      </button>
    </div>
  );
};

export default LandingPage;
