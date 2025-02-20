import React from 'react';
import githubIcon from '../../assets/github.png';
import linkedinIcon from '../../assets/linkedin.png';
import aboutBg from '../../assets/aboutbg.png';

//import Footer from '../Footer/Footer';

function AboutUs() {
  return (
    <div>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
        <div 
            className="w-full md:w-1/2 aspect-[4/3] rounded-lg bg-cover bg-top mb-8 md:mb-0"
            style={{
                backgroundImage: `url(${aboutBg})`,
                backgroundPosition: 'center top -20px', // Move upward by 20px
            }}
        >
        </div>

          <div className="w-full md:w-1/2 ml-0 md:ml-12">
            <h2 className="text-4xl font-bold text-blue-800 mb-6">
              About OceanFishMarket.lk
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Welcome to <strong>OceanFishMarket.lk</strong>, Sri Lanka's leading online platform for fresh and high-quality seafood. We aim to bring you the freshest fish and seafood directly from the market to your doorstep with ease and reliability.
            </p>
            <h3 className="text-2xl text-blue-700 font-semibold mb-4">
              Our Mission
            </h3>
            <ul className="list-disc pl-5 text-gray-700 mb-6">
              <li>To deliver fresh, high-quality seafood to customers across Sri Lanka.</li>
              <li>To support local fishermen by connecting them with a wider market.</li>
              <li>To ensure a transparent, hassle-free, and efficient seafood shopping experience.</li>
            </ul>
            <h3 className="text-2xl text-blue-700 font-semibold mb-4">
              Why Choose Us?
            </h3>
            <ul className="list-disc pl-5 text-gray-700 mb-6">
              <li>Wide variety of seafood sourced daily from trusted fishermen.</li>
              <li>Guaranteed freshness with strict quality checks.</li>
              <li>Easy online ordering and doorstep delivery.</li>
              <li>Affordable pricing with excellent customer service.</li>
            </ul>
            <h3 className="text-2xl text-blue-700 font-semibold mb-4">
              Contact Us
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Have any questions, feedback, or need assistance? Reach out to us!
            </p>
            <p className="text-lg text-blue-800 mb-4">
              Email: <a href="mailto:janakanupehewage02@gmail.com" className="underline hover:text-blue-600">janakanupehewage02@gmail.com</a>
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/janakanupehewage" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-800 flex items-center hover:text-blue-600"
              >
                <img src={githubIcon} alt="GitHub" className="w-6 h-6 mr-2" />
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/janaka-nupehewage-42024827a/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-800 flex items-center hover:text-blue-600"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6 mr-2" />
                LinkedIn    
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
