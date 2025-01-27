import React from 'react';

const AboutPage = () => {
  return (
    <div className=" text-black min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-gray-400 mt-5 mb-5">About Us.</h1>
      <p className="lg:text-lg sm:text-sm text-center max-w-3xl mb-6">
        Welcome to our blog! Here, we share insights, stories, and updates on topics that matter most to us. Our mission is to inspire, inform, and connect with our readers by delivering high-quality content that resonates with you.
      </p>
      <p className="lg:text-lg sm:text-sm text-center max-w-3xl mb-6">
        Whether you are here to learn something new, find inspiration, or just explore, we hope you enjoy your time here. Thank you for being a part of our journey.
      </p>

    </div>
  );
};

export default AboutPage;
