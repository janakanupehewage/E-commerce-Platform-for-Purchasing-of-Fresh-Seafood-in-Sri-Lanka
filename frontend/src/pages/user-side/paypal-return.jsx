import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
    const [loading, setLoading] = useState(true); // State to manage loading status
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");

    useEffect(() => {
        if (paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

            dispatch(capturePayment({ paymentId, payerId, orderId })).then(data => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem("currentOrderId");

                    // Set a delay before redirecting to the success page
                    setTimeout(() => {
                        window.location.href = "/shop/payment-success";
                    }, 3000); // Wait for 3 seconds before redirecting
                }
            });
        }
    }, [paymentId, payerId, dispatch]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-300">
            <Card className="p-8 rounded-xl shadow-lg bg-white w-96">
                <CardHeader className="p-0 text-center">
                    <CardTitle className="text-2xl font-semibold text-gray-800 mb-4">
                        Payment Processing... Please Wait!
                    </CardTitle>
                    <div className="flex justify-center items-center">
                        <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
                    </div>
                    <p className="mt-4 text-lg text-gray-600">
                        We are processing your payment. This might take a moment.
                    </p>
                </CardHeader>
            </Card>
        </div>
    );
}

export default PaypalReturnPage;
