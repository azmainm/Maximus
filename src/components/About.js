import React from 'react';
import aboutImage from '../images/about.jpg';

const About = () => {
  return (
    <div
      className="h-screen flex items-center justify-start bg-black text-white font-poppins relative"
      style={{
        backgroundImage: `url(${aboutImage.src})`,
        backgroundSize: '50%',
        backgroundPosition: 'center',
      }}
    >
      {/* Black background overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="max-w-lg p-8 z-10">
        <h1 className="text-4xl font-black mb-4 text-cyan-100 font-poppins">Fuel Your Body, Strengthen Your Mind</h1>
        <p className="text-md">
          From physical fitness to mental resilience, we bring together the best of health and wellness under one roof. Explore a diverse range of articles that inspire, educate, and empower you to lead a healthier and more balanced life.
        </p>
        <br />
        <p className="text-md italic">
        “This is the mark of perfection of character—to spend each day as if it were your last, without frenzy, laziness, or any pretending.”<br />
          <span className="text-sm">-Marcus Aurelius</span>
        </p>
      </div>

      {/* Developed by Azmain Morshed text */}
      <div className="absolute bottom-4 right-4 text-white text-sm z-10">
        Developed by Azmain Morshed
      </div>
    </div>
  );
};

export default About;
