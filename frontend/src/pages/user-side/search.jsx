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
import { ClipLoader } from "react-spinners";  // Add a loading spinner for fetching data

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector((state) => state.shopSearch);  // Track loading state
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {

    if(user){
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} kilograms can be added for this Seafood`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Product is added to cart",
          });
        }
      }
    );
    } else {
      toast({
        title : "Please Login First",
        variant: "destructive",
      });
    }
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="w-full mx-auto px-4 py-8 bg-gradient-to-r from-blue-100 to-green-100 min-h-screen">
      {/* Search Input Section */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-xl flex items-center bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="w-full py-3 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Search SeaFoods here..."
          />
          {keyword && (
            <button
              className="ml-3 text-gray-500 hover:text-gray-800"
              onClick={() => setKeyword("")}
            >
              <i className="fas fa-times-circle"></i> {/* Icon for clearing input */}
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center mb-8">
          <ClipLoader color="#4B6BFB" loading={isLoading} size={50} />
        </div>
      )}

      {/* No Results Found */}
      {keyword && !searchResults.length && !isLoading ? (
        <h1 className="text-4xl font-semibold text-center text-gray-700">No results found</h1>
      ) : null}

      {/* Product Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {keyword &&
          searchResults.map((item) => (
            <div
              key={item.id}
              className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl rounded-lg bg-white p-4"
            >
              <ShoppingProductTile
                handleAddtoCart={handleAddtoCart}
                product={item}
                handleGetProductDetails={handleGetProductDetails}
              />
            </div>
          ))}
      </div>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
