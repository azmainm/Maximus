import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowUpRight } from 'react-icons/fi';
import { Modal } from './Modal';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', tldr: '', id: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user_id from localStorage
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
          console.error('User ID is missing.');
          return;
        }

        // Fetch user profile and articles using the user_id from localStorage
        const response = await axios.get(`http://127.0.0.1:8000/profile/${user_id}`);
        const { full_name, email, username, total_articles, articles } = response.data;

        // Set user profile info
        setUserInfo({ full_name, email, username, total_articles });
        setUserArticles(articles);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Run only once when the component loads

  const openModal = (article) => {
    setModalContent({
      title: article.title,
      tldr: article.tldr,
      id: article.id,
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white font-poppins p-4">
      {/* Top Card with User Information */}
      <div className="w-full max-w-4xl p-6 mb-6 bg-black border border-cyan-200 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-2"><span className='text-cyan-200'>Full Name: </span>{userInfo.full_name}</h1>
        <p className="text-lg mb-2"><span className='text-cyan-200'>Email: </span>{userInfo.email}</p>
        <p className="text-lg mb-2"><span className='text-cyan-200'>Username: </span>{userInfo.username}</p>
        <p className="text-lg font-bold"><span className='text-cyan-200'>Total Posted Articles: </span>{userInfo.total_articles}</p>
      </div>

      {/* Cards with User's Posted Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {userArticles.length > 0 ? (
          userArticles.map((article) => (
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
          <p>No articles posted yet.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          title={modalContent.title}
          tldr={modalContent.tldr}
          onClose={() => setShowModal(false)}
          articleId={modalContent.id}  // Pass articleId to Modal
        />
      )}
    </div>
  );
};

export default Profile;
