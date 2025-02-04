import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({isAuthenticated, user, children}) {
  
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  if(location.pathname === "/"){
    
    
     if(isAuthenticated) {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }

    

    return <Navigate to="/shop/home" />;
  }

if(!isAuthenticated && 
  (location.pathname.includes("/dashboard") || location.pathname.includes("/products") || 
  location.pathname.includes("/orders") || location.pathname.includes("/ui") || location.pathname.includes("/manageNutrients"))
){
  return <Navigate to="/auth/login" />;
}

if(!isAuthenticated && 
  (location.pathname.includes("/account") || location.pathname.includes("/checkout"))
){
  return <Navigate to="/auth/login" />;
}

// if((location.pathname.includes("/shop"))){
//   return <Navigate to="/shop/home" />;
// }
  

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
  
}

export default CheckAuth
