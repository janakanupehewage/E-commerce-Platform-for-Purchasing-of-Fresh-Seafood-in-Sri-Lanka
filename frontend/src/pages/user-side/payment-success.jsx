import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
//import { useDispatch, useSelector } from 'react-redux'

function PaymentSuccessPage() {

    //const {cartItems} = useSelector(state=>state.shopCart)

    const navigate = useNavigate();
    //console.log(cartItems,"cart")

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
            <Card className="p-10 rounded-xl shadow-xl bg-white">
                <CardHeader className="p-0 text-center">
                    <CardTitle className="text-4xl font-bold text-gray-800">
                        Payment Successful!
                    </CardTitle>
                    <p className="mt-4 text-lg text-gray-600">
                        Your payment has been processed successfully. Thank you for your purchase!
                    </p>
                </CardHeader>
                <Button 
                    className="mt-6 w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition duration-300"
                    onClick={() => navigate("/shop/account")}
                >
                    View Orders
                </Button>
            </Card>
        </div>
    );
}

export default PaymentSuccessPage;
