import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [tldr, setTldr] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter(); // Initialize the router

  const handlePost = async () => {
    try {
      const token = localStorage.getItem('token');  // Assuming you store the token in localStorage after login
      const response = await axios.post('http://127.0.0.1:8000/createpost/', {
        title,
        tldr,
        content,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
        }
      });
      console.log('Article Posted', response.data);
      alert('Article created successfully!');
      router.push('/article');  // Redirect after successful post
    } catch (error) {
      console.error('Error posting article:', error);
      alert('Failed to create article');
    }
  };
  
  return (
    <div className="h-screen flex flex-col justify-center items-center pb-4 bg-black text-white font-poppins">
      <div className="max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg shadow-cyan-300">
        <h1 className="text-4xl font-bold mt-20 mb-6 text-cyan-300">Post your Article</h1>
        <label className="text-md mb-2">What do you call the article?</label>
        <input
          type="text"
          placeholder="Title"
          className="mb-4 p-3 w-full rounded-sm text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="text-md mb-2">Describe your article in 2-3 sentences</label>
        <input
          type="text"
          placeholder="TLDR"
          className="mb-4 p-3 w-full rounded-sm text-black"
          value={tldr}
          onChange={(e) => setTldr(e.target.value)}
        />
        <label className="text-md mb-2">Now, write your heart out</label>
        <textarea
          placeholder="Content"
          className="mb-6 p-3 w-full h-40 rounded-sm text-black"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button 
          onClick={handlePost} 
          className="px-6 py-3 mt-4 bg-black border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in duration-200">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
