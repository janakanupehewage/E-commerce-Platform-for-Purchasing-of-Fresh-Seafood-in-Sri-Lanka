import { Input } from "@/components/ui/input";
import ProductDetailsDialog from "@/components/user-view/product-details";
import ShoppingProductTile from "@/components/user-view/product-tile";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";



function SearchProducts(){


    const [keyword, setKeyword] = useState("");
    const [openDetailsDialog,setOpenDetailsDialog] = useState(false);
    const [searchParams, setSearchParams]=useSearchParams();
    const dispatch = useDispatch();
    const {searchResults} = useSelector((state)=>state.shopSearch);
    const {productDetails} = useSelector((state)=>state.shopProducts);
    const {cartItems} = useSelector((state)=>state.shopCart);
    const {user} = useSelector((state)=>state.auth);
    const {toast}=useToast();

    useEffect(()=>{
        if(keyword && keyword.trim() !== "" && keyword.trim().length > 3){
            setTimeout(()=>{
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword));
            },1000);
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResults());
        }
    }, [keyword]);

    function handleAddtoCart(getCurrentProductId, getTotalStock){
      console.log(cartItems);
    
      let getCartItems = cartItems.items || [];
    
      if(getCartItems.length){
        const indexOfCurrentItem = getCartItems.findIndex(item=>item.productId === getCurrentProductId);
        if(indexOfCurrentItem > -1){
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
          if(getQuantity + 1 > getTotalStock){
            toast({
              title : `Only ${getQuantity} kilograms can be added for this Seafood`,
              variant : "destructive",
            });
    
            return;
          }
    
        }
        
      }
    
      dispatch(addToCart({ userId : user?.id, productId : getCurrentProductId, quantity : 1,}))
      .then((data) => {
        if(data?.payload?.success){
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Product is added to cart",
          });
        }
      });
      
    }

    function handleGetProductDetails(getCurrentProductId){
      console.log(getCurrentProductId);
      dispatch(fetchProductDetails(getCurrentProductId));
    }

    useEffect(() => {
      if(productDetails !== null) setOpenDetailsDialog(true)
    }, [productDetails]);

    console.log(searchResults, "searchResults");

    return (<div className="container mx-auto md:px-6 px-4 py-8">
        <div className="flex justify-center mb-8">
            <div className="w-full flex items-center">
                <Input 
                    value={keyword} 
                    name="keyword" 
                    onChange={(event)=>setKeyword(event.target.value)} 
                    className="py-6" 
                    placeholder="Search SeaFoods here..."
                />
            </div>
        </div>
        {
            keyword && !searchResults.length  ? <h1 className="text-5xl font-extrabold">No result found</h1>

            : null
        }
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {
               keyword ? 
                (searchResults.map((item)=> 
                    <ShoppingProductTile 
                        handleAddtoCart={handleAddtoCart} 
                        product={item}
                        handleGetProductDetails={handleGetProductDetails}
                    />)
                )  : null
            }
        </div>
        <ProductDetailsDialog 
            open={openDetailsDialog} 
            setOpen={setOpenDetailsDialog} 
            productDetails={productDetails}
        />
    </div>);
}

export default SearchProducts;