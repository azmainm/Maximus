import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowUpRight, FiFilter } from 'react-icons/fi';  
import { Modal } from './Modal';  

const tags = [
  'Gym/Workout', 'Strength Training', 'Cardio', 'HIIT', 'Weightlifting', 
  'Gym Equipment', 'Workout Routines', 'Fitness', 'Home Workouts', 
  'Fitness Challenges', 'Personal Training', 'Fitness Goals', 
  'Transformations', 'Sports', 'Running', 
  'Swimming', 'Cycling', 'Sports Nutrition', 'Martial Arts',
  'Muay Thai', 'MMA', 'Self-Defense', 'Marathon', 'Rope Jump', 'Yoga',
  'Meditation', 'Mindfulness', 'Mental Health', 'Stress', 'Anxiety', 'Self-Care'
];

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null); // State to hold the selected article
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', tldr: '' });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedTags.length > 0) {
          selectedTags.forEach(tag => params.append('tags', tag));
        }
        
        const response = await axios.get('http://127.0.0.1:8000/article/', { params });
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, [selectedTags]);
  

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const openModal = (article) => {
    setModalContent({ 
      title: article.title, 
      tldr: article.tldr,
      id: article.id
    });
    setShowModal(true);
  };


  // Filter and search logic
  // const filteredArticles = articles.filter(article => {
  //   const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => article.tags?.includes(tag));
  //   return matchesSearch && matchesTags;
  // });

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white font-poppins p-4 relative">
      {/* Search and Filter */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center items-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
        {articles.length > 0 ? (
          articles.map(article => (
            <div
              key={article.id}
              className="relative p-4 rounded-md border border-cyan-300 bg-black shadow-md hover:shadow-cyan-300 hover:scale-105 transition ease-in-out duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <button
                onClick={() => openModal(article)}
                className="absolute top-2 right-2 bg-black text-white border border-cyan-300 rounded-full p-2 hover:bg-cyan-300 hover:text-black transition ease-in-out duration-200"
              >
                <FiArrowUpRight />
              </button>
            </div>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          title={modalContent.title}
          tldr={modalContent.tldr}
          onClose={() => setShowModal(false)}
          articleId={modalContent.id}
        />
      )}
    </div>
  );
};

export default Article;