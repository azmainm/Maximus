import React, { useState } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [tldr, setTldr] = useState('');
  const [content, setContent] = useState('');

  const handlePost = () => {
    // Add logic for posting the article here
    console.log('Article Posted', { title, tldr, content });
    // You can redirect to another page after posting if needed
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center pb-4 bg-black text-white font-poppins">
      <h1 className="text-4xl font-bold mt-20 mb-6 text-cyan-300">Post your Article</h1>
      <label className="text-md mb-2">What do you call the article?</label>
      <input
        type="text"
        placeholder="Title"
        className="mb-4 p-3 w-80 rounded-sm text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="text-md mb-2">Describe your article in 2-3 sentences</label>
      <input
        type="text"
        placeholder="TLDR"
        className="mb-4 p-3 w-80 rounded-sm text-black"
        value={tldr}
        onChange={(e) => setTldr(e.target.value)}
      />
      <label className="text-md mb-2">Now, write your heart out</label>
      <textarea
        placeholder="Content"
        className="mb-6 p-3 w-80 h-40 rounded-sm text-black"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button 
        onClick={handlePost} 
        className="px-6 py-3 mt-4 bg-black border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in duration-200">
        Post
      </button>
      </div>
  );
};

export default CreatePost;
