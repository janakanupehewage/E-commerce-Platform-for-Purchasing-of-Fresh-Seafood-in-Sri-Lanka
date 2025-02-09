import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-white text-center py-6 text-base">
      <div className="footer-credit">
        &copy; {new Date().getFullYear()} OceanFishMarket.lk | All rights reserved!
      </div>
    </footer>
  );
}

export default Footer;
