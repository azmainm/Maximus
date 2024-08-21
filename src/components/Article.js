import { useState } from 'react';
import { FiArrowUpRight, FiFilter } from 'react-icons/fi';  
import { Modal } from './Modal';  

const tags = [
  'Gym/Workout', 'Strength Training', 'Cardio', 'HIIT', 'Weightlifting', 
  'Gym Equipment', 'Workout Routines', 'Fitness', 'Home Workouts', 
  'Fitness Challenges', 'Personal Training', 'Fitness Goals', 
  'Transformations', 'Sports', 'Running', 
  'Swimming', 'Cycling', 'Sports Nutrition', 'Martial Arts',
  'Muay Thai', 'MMA', 'Self-Defense', 'Marathon', 'Rope Jump',  'Yoga',
   'Meditation', 'Mindfulness', 
  'Mental Health', 'Stress', 'Mindfulness',  'Anxiety',  'Self-Care'
];

const Article = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const openModal = (title, description) => {
    setModalContent({ title, description });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white font-poppins p-4 relative">
      {/* Search and Filter */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 w-2/3 rounded-md bg-black border border-cyan-300 text-white"
        />
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="ml-4 p-2 rounded-md bg-black border border-cyan-300 text-white hover:bg-cyan-800 transition ease-in-out duration-200 flex items-center justify-center"
        >
          <FiFilter />
        </button>
      </div>

      {/* Tag Filters Dropdown */}
      {showDropdown && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black border border-cyan-300 p-4 rounded-md shadow-lg z-50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag)}
                className={`p-2 rounded-full border border-cyan-300 text-sm hover:bg-cyan-800 transition ease-in-out duration-200 ${
                  selectedTags.includes(tag) ? 'bg-cyan-300 text-black' : ''
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cards Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl z-10">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="relative p-4 rounded-md border border-cyan-300 bg-black shadow-md hover:shadow-cyan-300 hover:scale-105 transition ease-in-out duration-300"
          >
            <h3 className="text-xl font-bold mb-2">Card Title {index + 1}</h3>
            <button
              onClick={() => openModal(`Card Title ${index + 1}`, `This is the description of card ${index + 1}`)}
              className="absolute top-2 right-2 bg-black text-white border border-cyan-300 rounded-full p-2 hover:bg-cyan-300 hover:text-black transition ease-in-out duration-200"
            >
              <FiArrowUpRight />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          title={modalContent.title}
          description={modalContent.description}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Article;