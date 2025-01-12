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
      <ProductDetailsDialog 
        open={openDetailsDialog} 
        setOpen={setOpenDetailsDialog} 
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
