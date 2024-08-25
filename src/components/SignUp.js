import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const SignUp = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // State for displaying a message
  const [IsSigningUp, setIsSigningUp] = useState(false);

  const handleSignUp = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          username: username,
          password: password,
        }),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();

      console.log(data);

      // Trigger the animation and set the Signup state
      setIsSigningUp(true);

      // setMessage("Sign up successful! Redirecting to login...");
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white font-poppins">
      <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
      <input
        type="text"
        placeholder="Full Name"
        className="mb-4 p-3 w-80 rounded-sm text-black"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="mb-4 p-3 w-80 rounded-sm text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
        onClick={handleSignUp} 
        className="px-6 py-3 bg-black border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in duration-200"
        animate={IsSigningUp ? { scale: 1.2, rotate: 360 } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
        Sign Up
      </motion.button>

      {/* Display success or error message */}
      {message && <p className="mt-4 text-cyan-500">{message}</p>}

      <p className="mt-4">
        I am a member?{' '}
        <span 
          onClick={() => router.push('/login')} 
          className="text-cyan-500 hover:text-cyan-300 cursor-pointer">
          Log in
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

export default SignUp;
