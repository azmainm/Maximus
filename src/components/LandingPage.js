import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import logo from '@/images/logo.png';

const LandingPage = () => {
  const router = useRouter();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Animation variants for sequential word animations
  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.5, // Delayed effect for each word
        duration: 1.5,  // Slowed down effect
        ease: "easeInOut",
      },
    }),
  };

   // Animation variants for button click
   const buttonClickVariant = {
    click: {
      scale: [1, 100], // Dramatic zoom effect
      rotate: [0, 360], // Slow rotation
      transition: { duration: 2, ease: "easeInOut" },
      backgroundColor: "#FFFFFF", // Changes to cyan-800
    },
  };

  const handleLoginClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      router.push('/login'); // Navigate to the login page after the animation
    }, 2000); // Delay to match the animation duration
  };

  function keepAlive() {
  fetch("http://127.0.0.1:8000/ping")
    .then(response => response.json())
    .then(data => console.log("Keep-alive ping:", data))
    .catch(error => console.error("Keep-alive failed:", error));
}

// Send a request every 2-3 minutes
setInterval(keepAlive, 180000); // 180000 ms = 3 minutes


  return (
    <motion.div
      className={`h-screen flex flex-col justify-center items-center bg-black text-white font-poppins overflow-hidden transition-colors duration-2000 ${isButtonClicked ? 'bg-white' : 'bg-black'}`}
    >
      {!isButtonClicked && (
        <>
          {/* Logo */}
          <div className="flex items-center mb-6">
            <Image src={logo} alt="Logo" width={120} height={120} />
          </div>

          {/* Text Animation */}
          <h2 className="text-4xl font-medium mb-4 text-center">
            Shape Your
          </h2>

          {/* Animated words */}
          <div className="text-center font-bold mb-8">
            <motion.h1
              className="text-7xl inline-block"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
            >
              Body.
            </motion.h1>
            <motion.h1
              className="text-7xl inline-block mx-2"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
            >
              Mind.
            </motion.h1>
            <motion.h1
              className="text-7xl inline-block text-cyan-300"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
            >
              Future.
            </motion.h1>
          </div>
        </>
      )}

      {/* Button Animation */}
      <motion.button
        onClick={handleLoginClick}
        className={`px-14 py-6 text-xl border hover:bg-cyan-600 border-white rounded-lg  hover:scale-105 transition ease-in-out duration-300 ${isButtonClicked ? 'bg-cyan-800 hover:bg-white' : 'bg-black'}`}
        whileTap="click"
        initial="initial"
        animate={isButtonClicked ? "click" : "visible"}
        variants={buttonClickVariant}
      >
        {!isButtonClicked && "Breathe in"} {/* Hide text when button is clicked */}
      </motion.button>
    </motion.div>
  );
};

export default LandingPage;
