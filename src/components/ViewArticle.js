import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ViewArticle = () => {
  const [article, setArticle] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const router = useRouter();
  const { articleId } = router.query;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/article/${articleId}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  if (!article) return <div>Loading...</div>;

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white font-poppins p-4">
      <div className="w-full max-w-4xl p-6 bg-black border border-cyan-300 rounded-md shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{article.title}</h1>
          {/* Favorite Icon */}
          <button onClick={toggleFavorite} aria-label="Favorite">
            <FontAwesomeIcon
              icon={faHeart}
              className={`transition-all duration-300 ${
                isFavorited ? 'text-red-700' : 'text-cyan-300'
              }`}
              style={{
                borderRadius: '50%',
                padding: '0.5rem',
                fontSize: '1.5rem'
              }}
            />
          </button>
        </div>
        <p className="text-lg mb-4">By <span className="text-cyan-300">{article.author_name}</span></p>
        <p className="text-sm text-gray-400 mb-6">{article.tldr}</p>

        {/* Preserving Paragraphs */}
        <div className="text-md mb-6 whitespace-pre-wrap break-words">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewArticle;