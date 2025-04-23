import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { useToast } from '@/hooks/use-toast';
import { useState } from "react"; // Import useState

function UserCartWrapper({ cartItems, setOpenCartSheet, setSheetOpen }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty.",
        variant: "destructive",
      });
      return;
    }

    if (totalCartAmount < 4000) {
      toast({
        title: "Minimum order value required",
        description: "Bulk purchases require a minimum order of Rs 4,000.00. Please add more seafood to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true); // Set loading to true when checkout starts

    // Simulate navigation and close cart after a short delay
    setTimeout(() => {
      navigate("/shop/checkout");
      setOpenCartSheet(false);
      setSheetOpen?.(false);
      setIsLoading(false); // Set loading to false when done
    }, 400); // delay
  };

  return (
    <SheetContent className="sm:max-w-md h-full flex flex-col">
      <SheetHeader>
        <SheetTitle>My Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4 flex-grow overflow-y-auto">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item, index) => <UserCartItemsContent key={index} cartItem={item} />)
          : null}
      </div>
      <div className="mt-5 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">Rs {totalCartAmount}.00</span>
        </div>
      </div>
      <Button
        onClick={handleCheckout}
        className="w-full mt-6"
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? (
          <span>Loading...</span> // Optional: Show loading text or spinner
        ) : (
          "Checkout"
        )}
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
