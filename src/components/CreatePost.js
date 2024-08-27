import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const tags = [
  'Gym/Workout', 'Strength', 'Cardio', 'HIIT', 'Weightlifting', 
  'Gym Equipment', 'Routines', 'Fitness', 'Home Workouts', 
  'Challenges', 'Fitness Goals', 
  'Transformation', 'Sports', 'Running', 
  'Swimming', 'Cycling', 'Sports Nutrition', 'Martial Arts',
  'Muay Thai', 'MMA', 'Self-Defense', 'Marathon', 'Rope Jump', 'Yoga',
  'Meditation', 'Mindfulness', 'Mental Health', 'Stress', 'Anxiety', 'Self-Care'
];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [tldr, setTldr] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]); // State to hold selected tags
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown visibility
  const [isPosting, setIsPosting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleTagSelection = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag); // Remove if already selected
      } else {
        return [...prevTags, tag]; // Add if not selected
      }
    });
  };

  const handlePost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://maximus-ur9l.onrender.com/createpost/', {
        title,
        tldr,
        content,
        tags: selectedTags // Send selected tags along with other data
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });

      // Trigger the animation and set the login state
      setIsPosting(true);

      // Wait for the animation duration before navigating
      setTimeout(() => {
        console.log('Article Posted', response.data);
        setShowSuccessModal(true); // Redirect after successful post
    },2000);
  }catch (error) {
      console.error('Error posting article:', error);
      alert('Failed to create article');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white font-poppins">
  <div className="max-w-lg p-6 bg-black rounded-lg shadow-lg shadow-cyan-300 w-full md:w-auto">
    <h1 className="text-4xl font-bold mt-8 mb-6 text-cyan-300 text-center">Post your Article</h1>
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
      onClick={toggleDropdown}
      className="mb-4 px-4 py-2 bg-cyan-300 text-black rounded-md hover:bg-cyan-400"
    >
      {dropdownOpen ? 'Close' : 'Select Tags'}
    </button>
    {dropdownOpen && (
      <div className="mb-4 p-3 w-full bg-black text-white rounded-sm border-green-400 shadow-sm shadow-cyan-400">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => handleTagSelection(tag)}
              className="mr-2"
            />
            <label>{tag}</label>
          </div>
        ))}
      </div>
    )}
    <br />
    <motion.button 
      onClick={handlePost} 
      className="px-6 py-3 mt-4 bg-black border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in duration-200"
      animate={isPosting ? { scale: 1.2, rotate: 360 } : {}}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
      Post
    </motion.button>
  </div>

  {/* Success Modal */}
  {showSuccessModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="relative w-11/12 md:w-1/2 lg:w-1/3 p-6 bg-black border border-cyan-300 rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-4">Article Created</h2>
          <p className="mb-6">Your article has been created successfully.</p>
          <button
            onClick={() => {
              setShowSuccessModal(false);
              router.push('/article'); // Redirect after clicking "Okay"
            }}
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

export default CreatePost;
