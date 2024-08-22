// import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// const tags = [
//   'Gym/Workout', 'Strength Training', 'Cardio', 'HIIT', 'Weightlifting', 
//   'Gym Equipment', 'Workout Routines', 'Fitness', 'Home Workouts', 
//   'Fitness Challenges', 'Personal Training', 'Fitness Goals', 
//   'Transformations', 'Sports', 'Running', 
//   'Swimming', 'Cycling', 'Sports Nutrition', 'Martial Arts',
//   'Muay Thai', 'MMA', 'Self-Defense', 'Marathon', 'Rope Jump',  'Yoga',
//    'Meditation', 'Mindfulness', 
//   'Mental Health', 'Stress', 'Mindfulness',  'Anxiety',  'Self-Care'
// ];

// const CreatePost = () => {
//   const [title, setTitle] = useState('');
//   const [tldr, setTldr] = useState('');
//   const [content, setContent] = useState('');
//   const router = useRouter(); // Initialize the router

//   const handlePost = async () => {
//     try {
//       const token = localStorage.getItem('token');  // Assuming you store the token in localStorage after login
//       const response = await axios.post('http://127.0.0.1:8000/createpost/', {
//         title,
//         tldr,
//         content,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
//         }
//       });
//       console.log('Article Posted', response.data);
//       alert('Article created successfully!');
//       router.push('/article');  // Redirect after successful post
//     } catch (error) {
//       console.error('Error posting article:', error);
//       alert('Failed to create article');
//     }
//   };
  
//   return (
//     <div className="flex flex-col justify-center items-center mb-0 bg-black text-white font-poppins">
//       <div className="max-w-lg p-6 bg-black rounded-lg shadow-lg shadow-cyan-300">
//         <h1 className="text-4xl font-bold mt-20 mb-6 text-cyan-300">Post your Article</h1>
//         <label className="text-md mb-2">What do you call the article?</label>
//         <input
//           type="text"
//           placeholder="Title"
//           className="mb-4 p-3 w-full rounded-sm text-black"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <label className="text-md mb-2">Describe your article in 2-3 sentences</label>
//         <input
//           type="text"
//           placeholder="TLDR"
//           className="mb-4 p-3 w-full rounded-sm text-black"
//           value={tldr}
//           onChange={(e) => setTldr(e.target.value)}
//         />
//         <label className="text-md mb-2">Now, write your heart out</label>
//         <textarea
//           placeholder="Content"
//           className="mb-6 p-3 w-full h-40 rounded-sm text-black"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <button 
//           onClick={handlePost} 
//           className="px-6 py-3 mt-4 bg-black border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in duration-200">
//           Post
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;



import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const tags = [
  'Gym/Workout', 'Strength Training', 'Cardio', 'HIIT', 'Weightlifting', 
  'Gym Equipment', 'Workout Routines', 'Fitness', 'Home Workouts', 
  'Fitness Challenges', 'Personal Training', 'Fitness Goals', 
  'Transformations', 'Sports', 'Running', 
  'Swimming', 'Cycling', 'Sports Nutrition', 'Martial Arts',
  'Muay Thai', 'MMA', 'Self-Defense', 'Marathon', 'Rope Jump', 'Yoga',
  'Meditation', 'Mindfulness', 
  'Mental Health', 'Stress', 'Mindfulness', 'Anxiety', 'Self-Care'
];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [tldr, setTldr] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]); // State to hold selected tags
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown visibility
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
      const response = await axios.post('http://127.0.0.1:8000/createpost/', {
        title,
        tldr,
        content,
        tags: selectedTags // Send selected tags along with other data
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      console.log('Article Posted', response.data);
      alert('Article created successfully!');
      router.push('/article'); // Redirect after successful post
    } catch (error) {
      console.error('Error posting article:', error);
      alert('Failed to create article');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-0 bg-black text-white font-poppins">
      <div className="max-w-lg p-6 bg-black rounded-lg shadow-lg shadow-cyan-300">
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
          onClick={toggleDropdown}
          className="mb-4 px-4 py-2 bg-cyan-300 text-black rounded-md hover:bg-cyan-400"
        >
          {dropdownOpen ? 'Close Tags' : 'Select Tags'}
        </button>
        {dropdownOpen && (
          <div className="mb-4 p-3 w-full bg-gray-200 rounded-sm">
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
