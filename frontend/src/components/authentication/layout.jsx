import { Outlet } from "react-router-dom";
import myImage from '../../assets/layout.jpg';

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side with Image */}
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-black">
        <img 
          src={myImage} 
          alt="Seafood Market" 
          className="w-full h-full object-cover"
        />
        {/* Optional overlay for text */}
        <div className="absolute bg-black bg-opacity-50 p-8 rounded-md text-white text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to OceanFishMarket.lk
          </h1>
        </div>
      </div>
      
      {/* Right Side with Form/Outlet */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
