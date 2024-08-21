import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';  
import { Modal } from './Modal';  

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });

  const openModal = (title, description) => {
    setModalContent({ title, description });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white font-poppins p-4">
      {/* Profile Card */}
      <div className="w-full max-w-4xl p-6 bg-black border border-cyan-300 rounded-md shadow-md mb-6">
        <h1 className="text-3xl font-bold mb-4">Full Name</h1>
        <p className="text-lg mb-4">Email: <span className="text-cyan-300">email@example.com</span></p>
        <p className="text-md mb-4">Username: <span className="text-cyan-300">@username</span></p>
        <p className="text-md">Total Posted Articles: <span className="text-cyan-300">12</span></p>
      </div>

      {/* User's Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="relative p-4 rounded-md border border-cyan-300 bg-black shadow-md hover:shadow-cyan-300 hover:scale-105 transition ease-in-out duration-300"
          >
            <h3 className="text-xl font-bold mb-2">Article Title {index + 1}</h3>
            <button
              onClick={() => openModal(`Article Title ${index + 1}`, `This is a summary of article ${index + 1}`)}
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

export default Profile;
