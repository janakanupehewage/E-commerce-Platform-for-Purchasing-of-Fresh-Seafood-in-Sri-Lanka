import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-400 text-white text-center py-6 text-base">
      <div className="footer-credit">
        &copy; {new Date().getFullYear()} OceanFishMarket.lk | All rights reserved!
      </div>
    </footer>
  );
}

export default Footer;
