import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add login logic here
    router.push('/dashboard'); // Redirect to the dashboard after login
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white font-poppins">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
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
      <button 
        onClick={handleLogin} 
        className="px-6 py-3 bg-black border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in duration-200">
        Log In
      </button>
      <p className="mt-4">
        Not a member?{' '}
        <span 
          onClick={() => router.push('/signup')} 
          className="text-cyan-500 hover:text-cyan-300 cursor-pointer">
          Sign up Now.
        </span>
      </p>
      <p className="mt-4 text-sm text-gray-300">
        Back to{' '}
        <span 
          onClick={() => router.push('/')} 
          className="text-sm text-cyan-400 hover:text-cyan-300 cursor-pointer">
          Home
        </span>
      </p>
    </div>
  );
};

export default Login;
