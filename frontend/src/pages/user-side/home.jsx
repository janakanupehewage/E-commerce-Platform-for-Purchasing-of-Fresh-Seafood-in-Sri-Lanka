import React, { useEffect, useState } from 'react';
import bannerOne from "../../assets/banner1.jpg";
import bannerTwo from "../../assets/banner2.jpg";
import bannerThree from "../../assets/banner3.jpg";
import bannerFour from "../../assets/banner4.jpg";
import fishIcon from "../../assets/fish.png";
import crabIcon from "../../assets/crab.png";
import musselIcon from "../../assets/mussel.png";
import scallopIcon from "../../assets/scallop.png";
import lobsterIcon from "../../assets/lobster.png";
import proteinChart from "../../assets/vitamins.jpg";
import FreshOceanImage from '../../assets/fresh_ocean.jpg';
import SustainablePracticeImage from '../../assets/sustainable_practice.jpg';
import FastDeliveryImage from '../../assets/fast_delivery.jpg';
import orderIcon from "../../assets/order_icon.png";
import processingIcon from "../../assets/processing_icon.png";
import deliveryIcon from "../../assets/delivery_icon.png";
import contactBg from "../../assets/contactBg1.jpg";
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, Fish } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/user-view/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/user-view/product-details';
import { getBannerImages } from '@/store/common-slice';
import { motion } from 'framer-motion';

const categoriesWithIcon = [
  { id: "fish", label: "Fish", icon: fishIcon, isImage: true },
  { id: "crab", label: "Crab", icon: crabIcon, isImage: true },
  { id: "lobster", label: "Lobster", icon: lobsterIcon, isImage: true },
  { id: "scallops", label: "Scallops", icon: scallopIcon, isImage: true },
  { id: "mussels", label: "Mussels", icon: musselIcon, isImage: true },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { bannerImageList } = useSelector((state)=> state.commonBanner);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const slides = [bannerOne, bannerTwo, bannerThree, bannerFour];

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }

  function handleGetProductDetails(getCurrentProductId){
    //console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId){

    // if (!user) {
    //   navigate('/auth/login');
    //   return;
    // }

    //console.log(getCurrentProductId);
    if(user) {
    dispatch(addToCart({ userId : user?.id, productId : getCurrentProductId, quantity : 1,}))
    .then((data) => {
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    })} 
    
    else{
    
    toast({
      title : "Please Login First",
      variant: "destructive",
    });}
    
    
    
  }

  useEffect(() => {
    if(productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails]);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [bannerImageList]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
  }, [dispatch]);

  //console.log(productList, "productList");

  useEffect(()=>{
    dispatch(getBannerImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Slider */}
      <div className="relative w-full h-[310px] overflow-hidden">
        {bannerImageList && bannerImageList.length > 0 ? bannerImageList.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        )) : null}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + bannerImageList.length) % bannerImageList.length)}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImageList.length)}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card key={categoryItem.id} onClick={()=>handleNavigateToListingPage(categoryItem, "category")} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {categoryItem.isImage ? (
                    <img src={categoryItem.icon} alt={categoryItem.label} className="w-12 h-12 mb-4" />
                  ) : (
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  )}
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Fresh Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList
              .filter((product) =>
                ["fish", "crab", "lobster", "scallops", "mussels"].includes(product.category)
              ) // Filter only the relevant categories
              .sort((a, b) => a.price - b.price) // Sort by price in ascending order
              .slice(0, 4) // Select the top 4 cheapest products
              .map((productItem) => (
                  <ShoppingProductTile 
                    key={productItem.id} 
                    handleGetProductDetails={handleGetProductDetails} 
                    product={productItem}
                    handleAddtoCart={handleAddtoCart} 
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gradient-to-r from-blue-100 via-teal-100 to-blue-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Why Choose Us?</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6" 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}>
            
            <div className="bg-gradient-to-t from-green-300 to-teal-400 rounded-lg shadow-lg p-6 text-center">
              <div className="h-40 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${FreshOceanImage})` }}></div>
              <h3 className="text-xl font-semibold mb-4 text-white">Fresh From the Ocean</h3>
              <p className="text-white">We source our seafood directly from the coast, ensuring the freshest quality.</p>
            </div>
            
            <div className="bg-gradient-to-t from-purple-300 to-pink-400 rounded-lg shadow-lg p-6 text-center">
              <div className="h-40 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${SustainablePracticeImage})` }}></div>
              <h3 className="text-xl font-semibold mb-4 text-white">Sustainable Practices</h3>
              <p className="text-white">Our commitment to sustainable fishing helps protect marine life.</p>
            </div>
            
            <div className="bg-gradient-to-t from-yellow-300 to-orange-400 rounded-lg shadow-lg p-6 text-center">
              <div className="h-40 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${FastDeliveryImage})` }}></div>
              <h3 className="text-xl font-semibold mb-4 text-white">Fast Delivery</h3>
              <p className="text-white">We deliver your seafood quickly while maintaining peak freshness.</p>
            </div>

          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">How Our Platform Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
              <img src={orderIcon} alt="Place Your Order" className="w-20 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">Place Your Order</h3>
              <p className="text-gray-600">Select your favorite seafood from our marketplace.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
              <img src={processingIcon} alt="We Source & Pack" className="w-20 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">We Source & Pack</h3>
              <p className="text-gray-600">Freshly sourced, hygienically packed for you.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
              <img src={deliveryIcon} alt="Delivered Fresh" className="w-20 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">Delivered Fresh</h3>
              <p className="text-gray-600">Fast, secure delivery straight to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      

      

      <section className="py-16 bg-gradient-to-r from-cyan-50 via-blue-100 to-cyan-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 underline decoration-blue-400 decoration-4">Nutritional Benefits of Seafood</h2>
          
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-10 bg-white shadow-2xl rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }}>
            
            <div className="w-full md:w-1/2">
              <img src={proteinChart} alt="Fish Protein Chart" className="w-full rounded-2xl shadow-xl transform hover:scale-105 transition duration-500 ease-in-out" />
            </div>
            
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-3xl font-bold text-blue-800 mb-4">🌊 Packed with Essential Nutrients</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Seafood is a powerhouse of high-quality protein, omega-3 fatty acids, vitamins, and minerals.
                It promotes heart health ❤️, supports brain function 🧠, and enhances overall well-being 🌟.
              </p>
              <ul className="list-disc list-inside text-left text-gray-600 space-y-2">
                <li>Rich in Omega-3 Fatty Acids for Heart Health</li>
                <li>Excellent Source of Lean Protein</li>
                <li>Boosts Brain Development & Cognitive Function</li>
                <li>Loaded with Essential Vitamins & Minerals</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-cover bg-center text-white" style={{ backgroundImage: `url(${contactBg})` }}>
        <div className="bg-black bg-opacity-60 p-10 rounded-2xl shadow-xl mx-6 md:mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6 text-lg">Have questions or need bulk orders? Reach out to us anytime!</p>
          <button 
            className="px-8 py-3 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-400 transition-transform transform hover:scale-105"
            onClick={()=>navigate("/shop/contact")}
          >
            Contact Us Now
          </button>
        </div>
      </section>




      <ProductDetailsDialog 
        open={openDetailsDialog} 
        setOpen={setOpenDetailsDialog} 
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
