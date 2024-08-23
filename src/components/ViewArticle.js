import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ViewArticle = () => {
  const [article, setArticle] = useState(null);
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white font-poppins p-4">
      <div className="w-full max-w-4xl p-6 bg-black border border-cyan-300 rounded-md shadow-md mb-6">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="text-lg mb-4">By <span className="text-cyan-300">{article.author_name}</span></p>
        <p className="text-sm text-gray-400 mb-6">{article.tldr}</p>
        <p className="text-md mb-6">{article.content}</p>
      </div>
    </div>
  );
};

export default ViewArticle;
