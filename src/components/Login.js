import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid username or password');
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
    }
  };


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
        animate={isLoggingIn ? { scale: 1.2, rotate: 360 } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
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
    </div>
  );
};

export default Login;