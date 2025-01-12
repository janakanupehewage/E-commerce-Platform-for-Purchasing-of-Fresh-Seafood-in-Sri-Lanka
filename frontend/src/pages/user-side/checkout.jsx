import React, { useState } from 'react'
import img from '../../assets/accountBanner.png'
import Address from '@/components/user-view/address'
import { useDispatch, useSelector } from 'react-redux'
import UserCartItemsContent from '@/components/user-view/cart-items-content';
import { Button } from '@/components/ui/button';
import { createNewOrder } from '@/store/shop/order-slice';
import { useToast } from '@/hooks/use-toast';

function ShoppingCheckout() {

  const {cartItems} = useSelector((state)=> state.shopCart);
  const {user} = useSelector((state)=> state.auth);
  const {approvalURL} = useSelector(state=>state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const {addressList} = useSelector((state)=>state.shopAddress);
  const dispatch = useDispatch();
  const {toast} = useToast();

  console.log(currentSelectedAddress, "currentSelectedAddress");

  const totalCartAmount =
  cartItems && cartItems.items && cartItems.items.length > 0
    ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
            currentItem?.quantity,
        0
      )
    : 0;
  

  function handleInitiatePaypalPayment(){

    if(cartItems.length === 0) {
      toast({
        title : "Your cart is empty.",
        variant : "destructive",
      });

      return;
    }

    if (!addressList || addressList.length === 0) {
      // Case: No addresses added
      toast({
        title: "No addresses found. Please fill out the address form and add an address before proceeding.",
        variant: "destructive",
      });
      return; // Exit the function after showing the toast
    }
    
    if (currentSelectedAddress === null) {
      // Case: Addresses exist but none selected
      toast({
        title: "Please select an address to proceed. Click on one of the addresses displayed above to choose.",
        variant: "destructive",
      });
      return; // Exit the function after showing the toast
    }
    
    
    
    const orderData = {
      userId : user?.id,
      cartId : cartItems?._id,
      cartItems : cartItems.items.map(singleCartItem => ({
        productId : singleCartItem?.productId,
        title : singleCartItem?.title,
        image : singleCartItem?.image,
        price : singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity : singleCartItem?.quantity,
      })),
      addressInfo : {
        addressId : currentSelectedAddress?._id,
        address : currentSelectedAddress?.address,
        city : currentSelectedAddress?.city,
        postalcode : currentSelectedAddress?.postalcode,
        phone : currentSelectedAddress?.phone,
        notes : currentSelectedAddress?.notes,
      },
      orderStatus : "pending",
      paymentMethod : "paypal",
      paymentStatus : "pending",
      totalAmount : totalCartAmount,
      orderDate : new Date(),
      orderUpdateDate : new Date(),
      paymentId : "",
      payerId : "",
    };

    //console.log(orderData);

    dispatch(createNewOrder(orderData)).then((data)=>{
      console.log(data, "Jana");
      if(data?.payload?.success){
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }


  if(approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[250px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress}/>
        <div className="flex flex-col gap-4">
          {
            cartItems && cartItems.items && cartItems.items.length > 0 
            ? cartItems.items.map((item)=> (
                <UserCartItemsContent cartItem={item}/>
              )) 
            : null
          }
          <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">Rs {totalCartAmount}.00</span>
                </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {
              
              //selectedId ?
                isPaymentStart ? "Processing Paypal Payment..." : "Checkout with Paypal"

                // toast({
                //   title : "Please Select a Addreess Before Chechkout"
                // })
              
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout