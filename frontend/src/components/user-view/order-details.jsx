import { useSelector } from "react-redux";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

function ShoppingOrderDetailsView({ orderDetails }) {
    const { user } = useSelector(state => state.auth);

    const calculateCancelDate = (orderDate) => {
        if (!orderDate) return '';
        const orderDateObj = new Date(orderDate);
        const cancelDate = new Date(orderDateObj);
        cancelDate.setDate(orderDateObj.getDate() + 2);
        return cancelDate.toISOString().split('T')[0];
    };

    return (
        <DialogContent className="w-[90vw] sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-lg">
            <div className="grid gap-6">
                
                {/* Important Notice Section */}
                <div className="flex flex-col gap-2 p-4 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="font-medium">Important Notice:</p>
                            <p className="text-sm text-gray-600">
                                Order Date: {orderDetails?.orderDate?.split("T")[0]} <br/>
                                Cancel Date: {calculateCancelDate(orderDetails?.orderDate)}
                            </p>
                            <p className="text-sm text-green-600">
                            If the seller is unable to process your order within 2 days from the order date, it 
                            will be automatically canceled. A full refund will be issued to your original payment 
                            method. If this issue occurs, the seller will contact you directly.
                            </p>
                        </div>
                        <Label className="text-white bg-red-600 px-2 py-1 rounded">
                            Attention
                        </Label>
                    </div>
                </div>
                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">Order Price</p>
                    <Label>Rs {orderDetails?.totalAmount}.00</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">Payment Method</p>
                    <Label>{orderDetails?.paymentMethod}</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">Payment Status</p>
                    <Label>{orderDetails?.paymentStatus}</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">Order Status</p>
                    <Label>
                        <Badge className={`py-1 px-3 ${orderDetails?.orderStatus === "inDelivery" 
                                            ? "bg-green-500" :
                                            orderDetails?.orderStatus === "rejected" 
                                            ? "bg-red-600" 
                                            : "bg-black"}`}>
                                    {orderDetails?.orderStatus}
                        </Badge>
                    </Label>
                </div>

                <Separator />

                {/* Order Details Section */}
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? 
                                orderDetails.cartItems.map((item, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <span>Title: {item.title}</span>
                                        <span>Quantity: {item.quantity} kg</span>
                                        <span>Price: Rs {item.quantity * item.price}.00</span>
                                    </li>
                                )) 
                            : <p className="text-gray-500">No items in the order.</p>}
                        </ul>
                    </div>
                </div>

                {/* Shipping Info Section */}
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>{user?.userName}</span>
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.postalcode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </DialogContent>
    );
}

export default ShoppingOrderDetailsView;
