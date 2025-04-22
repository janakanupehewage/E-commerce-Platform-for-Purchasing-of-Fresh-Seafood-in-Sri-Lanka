import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { orderList, orderDetails } = useSelector(state => state.shopOrder);

    useEffect(() => {
        dispatch(getAllOrdersByUserId(user?.id));
    }, [dispatch, user?.id]);

    const handleFetchOrderDetails = (orderId) => {
        dispatch(getOrderDetails(orderId));
    };

    const sortedOrderList = [...orderList]?.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    useEffect(() => {
        if (orderDetails !== null) setOpenDetailsDialog(true);
    }, [orderDetails]);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead>Order Price</TableHead>
                                <TableHead><span className="sr-only">Details</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedOrderList?.length > 0 ? (
                                sortedOrderList.map(orderItem => (
                                    <TableRow key={orderItem?._id}>
                                        <TableCell>{orderItem?._id}</TableCell>
                                        <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                                        <TableCell>
                                            <Badge className={`py-1 px-3 ${orderItem?.orderStatus === "inDelivery"
                                                ? "bg-green-500"
                                                : orderItem?.orderStatus === "rejected"
                                                ? "bg-red-600"
                                                : "bg-black"}`}>
                                                {orderItem?.orderStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>Rs {orderItem?.totalAmount}.00</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500">
                                        No orders found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Dialog shown separately */}
            <Dialog open={openDetailsDialog} onOpenChange={(open) => {
                if (!open) {
                    setOpenDetailsDialog(false);
                    dispatch(resetOrderDetails());
                }
            }}>
                <DialogContent className="w-[90vw] sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-lg border-none">
                    {orderDetails && <ShoppingOrderDetailsView orderDetails={orderDetails} />}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ShoppingOrders;
