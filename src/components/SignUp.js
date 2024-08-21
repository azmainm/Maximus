import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SignUp = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const res = await fetch("http://127.0.0.1:8000/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        full_name: fullName,
        email: email,
        username: username,
        password: password
      })
    });
  
    const data = await res.json();
    if (res.ok) {
      // Redirect to dashboard or login page after signup
      router.push("/login");
    } else {
      // Show error message
      console.error(data.detail);
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
      {/* w-full sm:w-96 lg:w-1/4 sm:h-28 lg:h-14 */}
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
