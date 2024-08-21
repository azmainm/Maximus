import { useState } from 'react';
import { Modal } from './Modal';

const ViewArticle = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });

  const openModal = (title, description) => {
    setModalContent({ title, description });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white font-poppins p-4">
      {/* Article Content */}
      <div className="w-full max-w-4xl p-6 bg-black border border-cyan-300 rounded-md shadow-md mb-6">
        <h1 className="text-3xl font-bold mb-4">Article Title</h1>
        <p className="text-lg mb-4">By <span className="text-cyan-300">Author Name</span></p>
        <p className="text-sm text-gray-400 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus, velit in elementum scelerisque, urna lacus tempus quam, et scelerisque metus odio ut orci.</p>
        <p className="text-md mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet fermentum lacus, sed dignissim elit blandit a. Nulla eget eros ut nisi consequat faucibus. Aenean accumsan risus sit amet dolor placerat, nec feugiat leo faucibus. Pellentesque ut magna ante. Integer posuere, lorem nec sollicitudin vehicula, elit ex eleifend lacus, ac auctor metus tortor nec nisi. Maecenas condimentum risus orci, et posuere odio blandit ut...
        </p>
      </div>

     
    </div>
  );
};

export default ViewArticle;
