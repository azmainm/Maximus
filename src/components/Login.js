import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://maximus-ur9l.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('');
      }
  
      const data = await response.json();
      
      // Save token and user ID in localStorage
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', username);
      localStorage.setItem('user_id', data.user_id);  
      console.log("User ID:",data.user_id)
  
      // Trigger the animation and set the login state
      setIsLoggingIn(true);

      // Wait for the animation duration before navigating
      setTimeout(() => {
        router.push('/article');
      }, 1000); // Adjust the timing to match the animation duration
    } catch (error) {
      setError(error.message);
      setShowErrorModal(true);
    }
  };
//   const handleLogin = async () => {
//   // No need to check for empty fields or validate input

//   // Trigger the animation and set the login state
//   setIsLoggingIn(true);

//   // Wait for the animation duration before navigating
//   setTimeout(() => {
//     router.push('/article');
//   }, 1000); // Adjust the timing to match the animation duration
// };


  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white font-poppins">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        className="mb-4 p-3 w-80 rounded-sm text-black"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-6 p-3 w-80 rounded-sm text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <motion.button
        onClick={handleLogin}
        className="px-6 py-3 bg-black border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in duration-200"
        animate={isLoggingIn ? { scale: 1.2, rotate: 10 } : {}}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        Log In
      </motion.button>

      <p className="mt-4">
        Not a member?{' '}
        <span
          onClick={() => router.push('/signup')}
          className="text-cyan-500 hover:text-cyan-300 cursor-pointer"
        >
          Sign up Now.
        </span>
      </p>
      <p className="mt-4 text-sm text-gray-300">
        Back to{' '}
        <span
          onClick={() => router.push('/')}
          className="text-sm text-cyan-400 hover:text-cyan-300 cursor-pointer"
        >
          Home
        </span>
      </p>

      {/* Error Modal */}
    {showErrorModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="relative w-11/12 md:w-1/2 lg:w-1/3 p-6 bg-black border border-cyan-300 rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Login Error!</h2>
          <p className="mb-6">Invalid username or password.</p>
          <button
            onClick={() => setShowErrorModal(false)}
            className="px-6 py-2 bg-black border border-cyan-300 rounded-lg hover:bg-cyan-800 transition ease-in-out duration-200"
          >
            Okay
          </button>
        </div>
      </div>
    )}
    </div>
  );
};

export default Login;
