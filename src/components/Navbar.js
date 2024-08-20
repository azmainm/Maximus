import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from '@/images/logo.png'; // adjust the path based on your folder structure

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full h-12 flex justify-between items-center px-4 shadow-md z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={40} height={40} />
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-sm">
        <span 
          onClick={() => router.push('/read')}
          className="cursor-pointer hover:text-cyan-300 transition ease-in-out duration-200"
        >
          Read
        </span>
        <span 
          onClick={() => router.push('/profile')}
          className="cursor-pointer hover:text-cyan-300 transition ease-in-out duration-200"
        >
          Profile
        </span>
        <span 
          onClick={() => router.push('/logout')}
          className="cursor-pointer hover:text-cyan-300 transition ease-in-out duration-200"
        >
          Log Out
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
