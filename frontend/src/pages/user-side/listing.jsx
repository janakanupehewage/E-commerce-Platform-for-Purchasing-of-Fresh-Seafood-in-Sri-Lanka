import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ProductFilter from '@/components/user-view/filter'
import ProductDetailsDialog from '@/components/user-view/product-details'
import ShoppingProductTile from '@/components/user-view/product-tile'
import { sortOptions } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

function createSearchParamsHelper(filterParams){
  const queryParams = [];

  for(const [key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length > 0){
      const paramValue = value.join(',');
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  console.log(queryParams, "queryParams");
  return queryParams.join("&");
}

function ShoppingListing() {

const dispatch = useDispatch();
const { productList, productDetails } = useSelector((state) => state.shopProducts);
const {cartItems} = useSelector(state=>state.shopCart)
const {user} = useSelector(state=>state.auth);
const [filters, setFilters] = useState({});
const [sort, setSort] = useState(null);
const [ searchParams, setSearchParams ] = useSearchParams();
const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
const {toast} = useToast();

function handleSort(value){
  //console.log(value);
  setSort(value);
}

function handleFilter(getSectionId, getCurrentOption){
  //console.log(getSectionId, getCurrentOption);

  let cpyFilters = { ...filters };
  const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

  if(indexOfCurrentSection === -1){
    cpyFilters ={
      ...cpyFilters,
      [getSectionId]: [getCurrentOption]
    };
  } else{
    const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

    if(indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption);
    else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
  }

  //console.log(cpyFilters);
  setFilters(cpyFilters);
  sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
}

function handleGetProductDetails(getCurrentProductId){
  //console.log(getCurrentProductId);
  dispatch(fetchProductDetails(getCurrentProductId));
}

function handleAddtoCart(getCurrentProductId, getTotalStock){
  //console.log(cartItems);

  if(user){

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
else{
  toast({
    title : "Please Login First",
    variant: "destructive",
  });
}
  
}

useEffect(()=>{
  setSort("price-lowtohigh");
  setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
}, []);

useEffect(()=>{
  if(filters && Object.keys(filters).length > 0){
    const createQueryString = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(createQueryString))
  }
}, [filters])

useEffect(()=>{
  if(filters !== null && sort !== null)
    dispatch(
      fetchAllFilteredProducts({filterParams : filters, sortParams : sort})
    );
}, [dispatch, sort, filters]);

useEffect(() => {
  if(productDetails !== null) setOpenDetailsDialog(true)
}, [productDetails])

//console.log(productList, "productList"); product list
  //fetch list of products





  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter}/>
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Seafood Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowUpDownIcon className="h-4 w-4"/>
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-8">
          {
            productList && productList.length > 0 ?
            productList.map((productItem, index) => (
              <ShoppingProductTile
              key={index} 
              handleGetProductDetails={handleGetProductDetails} 
              product={productItem}
              handleAddtoCart={handleAddtoCart}
              />
            )) : null
          }
        </div>
      </div>
      <ProductDetailsDialog 
        open={openDetailsDialog} 
        setOpen={setOpenDetailsDialog} 
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing