import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './SignUp.module.scss'; // Assuming you're using Sass

const SignUp = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Add sign-up logic here
    router.push('/dashboard'); // Redirect to the dashboard after sign-up
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white font-poppins">
      <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
      <input
        type="text"
        placeholder="Full Name"
        className="mb-4 p-3 w-80 text-black"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="mb-4 p-3 w-80 text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        className="mb-4 p-3 w-80 text-black"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-6 p-3 w-80 text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button 
        onClick={handleSignUp} 
        className="px-6 py-3 bg-black border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in duration-200">
        Sign Up
      </button>
      <p className="mt-4">
        I am a member?{' '}
        <span 
          onClick={() => router.push('/login')} 
          className="text-cyan-500 hover:text-cyan-300 cursor-pointer">
          Log in
        </span>
      </p>
    </div>
  );
};

export default SignUp;
