import { Routes, Route } from "react-router-dom"
import AuthRegister from "./pages/authentication/register"
import AuthLogin from "./pages/authentication/login"
import AuthLayout from "./components/authentication/layout"
import AdminLayout from "./components/admin-side/layout"
import AdminDashboard from "./pages/admin-side/dashboard"
import AdminProducts from "./pages/admin-side/products"
import AdminOrders from "./pages/admin-side/orders"
import AdminFeatures from "./pages/admin-side/features"
import ShoppingLayout from "./components/user-view/layout"
import NotFound from "./pages/not-found"
import ShoppingHome from "./pages/user-side/home"
import ShoppingListing from "./pages/user-side/listing"
import ShoppingCheckout from "./pages/user-side/checkout"
import ShoppingAccount from "./pages/user-side/account"
import CheckAuth from "./components/common/CheckAuth"
import UnauthPage from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/authentication-slice"
import { Skeleton } from "@/components/ui/skeleton"
//import AdminAnalytics from "./pages/admin-side/analytics"
import UIComponents from "./pages/admin-side/ui"
import AboutUs from "./pages/user-side/aboutus"
import ContactUs from "./pages/user-side/contact"
import PaypalReturnPage from "./pages/user-side/paypal-return"
import PaymentSuccessPage from "./pages/user-side/payment-success"
import SearchProducts from "./pages/user-side/search"
import SeafoodPrediction from "./pages/user-side/seafood-prediction"
import UserNutrientPage from "./pages/user-side/calculate-nutriants"
import AdminManageNutrient from "./pages/admin-side/ManageNutriants"



function App() {
  

  const { user, isAuthenticated, isLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  
  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  if(isLoading){
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  //console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">

      

      <Routes>
        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>
          } />
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
          }>
          <Route path="login" element={<AuthLogin/>}/>
          <Route path="register" element={<AuthRegister/>}/>
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>
          }>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="products" element={<AdminProducts/>}/>
          <Route path="orders" element={<AdminOrders/>}/>
          <Route path="features" element={<AdminFeatures/>}/>
          <Route path="ui" element={<UIComponents/>}/>
          <Route path="manageNutrients" element={<AdminManageNutrient/>}/>
        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome/>}/>
          <Route path="listing" element={<ShoppingListing/>}/>
          <Route path="about" element={<AboutUs/>}/>
          <Route path="contact" element={<ContactUs/>}/>
          <Route path="checkout" element={<ShoppingCheckout/>}/>
          <Route path="account" element={<ShoppingAccount/>}/>
          <Route path="paypal-return" element={<PaypalReturnPage/>} />
          <Route path="payment-success" element={<PaymentSuccessPage/>} />
          <Route path="search" element={<SearchProducts/>} />
          <Route path="prediction" element={<SeafoodPrediction/>} />
          <Route path="calculate-nutrients" element={<UserNutrientPage/>} />
        
        </Route>

        <Route path="/unauth-page" element={<UnauthPage/>}/>
        <Route path="*" element={<NotFound/>}/>
         
      </Routes>

    </div>
  )
}

export default App
