import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowUpRight, FiTrash2 } from 'react-icons/fi';
import { Modal } from './Modal';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', tldr: '', id: '' });
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const [showDeletionModal, setShowDeletionModal] = useState(false);


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

        // Fetch favorite articles
      const favoriteArticlesResponse = await axios.get(`http://127.0.0.1:8000/favorite_articles/${user_id}`);
      setFavoriteArticles(favoriteArticlesResponse.data);
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

  const handleDeleteArticle = async (articleId) => {
    try {
      // Get the JWT token from local storage
      const token = localStorage.getItem('token');
  
      // Send a request to the backend to delete the article with the token in the headers
      await axios.delete(`http://127.0.0.1:8000/delete_article/${articleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Remove the deleted article from the userArticles state variable
      setUserArticles(userArticles.filter((article) => article.id !== articleId));
  
      // Show the deletion success modal
      setShowDeletionModal(true);
    } catch (error) {
      console.error('Error deleting article:', error);
    }

    setShowDeletionModal(true);
  };
  
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white font-poppins p-4">
      {/* Top Card with User Information */}
      <div className="w-full max-w-4xl p-6 mb-6 bg-black border border-cyan-200 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-2"><span className='text-cyan-200'>{userInfo.full_name}</span></h1>
        <p className="text-md mb-2"><span className='text-cyan-100'>Email: </span>{userInfo.email}</p>
        <p className="text-md mb-2"><span className='text-cyan-100'>Username: </span>{userInfo.username}</p>
        <p className="text-md font-bold"><span className='text-cyan-100'>Total Posted Articles: </span>{userInfo.total_articles}</p>
      </div>

      {/* Cards with User's Posted Articles */}
      <h1 className='font-poppins font-semibold text-lg mb-4'>Posted Articles</h1>
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
              <button
                  onClick={() => handleDeleteArticle(article.id)}
                  className="absolute top-2 right-12 bg-black text-white border border-cyan-300 rounded-full p-2 hover:bg-cyan-300 hover:text-black transition ease-in-out duration-200"
                >
                  <FiTrash2 />
                </button>

            </div>

          ))
        ) : (
          <p>No articles posted yet.</p>
        )}
      </div>

      {/* Cards with User's Favorite Articles */}
      <h1 className='font-poppins font-semibold text-lg mb-4 mt-10'>Favorite Articles</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
  {favoriteArticles.length > 0 ? (
    favoriteArticles.map((article) => (
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
    <p>No favorite articles yet.</p>
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

      {/* Deletion Success Modal */}
    {showDeletionModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="relative w-11/12 md:w-1/2 lg:w-1/3 p-6 bg-black border border-cyan-300 rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-4">Article Deleted</h2>
          <p className="mb-6">The article has been deleted successfully.</p>
          <button
            onClick={() => setShowDeletionModal(false)}
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

export default Profile;
