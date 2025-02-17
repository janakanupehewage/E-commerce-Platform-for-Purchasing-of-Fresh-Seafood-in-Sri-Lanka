const nodemailer = require("nodemailer");
const Order = require("../../models/Order");
const User = require("../../models/User"); // Import User model


const getAllOrdersOfAllUsers = async(req,res)=>{
    try{


        const orders = await Order.find({});

        if(!orders.length) {
            return res.status(404).json({
                success : false,
                message : "No orders found!",
            })
        }

        res.status(200).json({
            success : true,
            data : orders,
        })


    } catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Error",
        });
    }
};

const getOrderDetailsForAdmin = async(req,res)=>{
    try{

        const {id} = req.params;

        const order = await Order.findById(id);

        if(!order) {
            return res.status(404).json({
                success : false,
                message : "Order not found!",
            })
        }

        res.status(200).json({
            success : true,
            data : order,
        })

    } catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Error",
        });
    }
};

const updateOrderStatus = async(req,res)=>{
    try{

        const {id} = req.params;
        const {orderStatus} = req.body;

        const order = await Order.findById(id);

        if(!order) {
            return res.status(404).json({
                success : false,
                message : "Order not found!",
            });
        }

        // Fetch the user details using userId
        const user = await User.findById(order.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found for this order!",
            });
        }

        await Order.findByIdAndUpdate(id,{orderStatus, orderUpdateDate: new Date()}, 
        { new: true }  // Returns the updated order
    
    );

        // Send email if status is updated to "inDelivery"
        if (orderStatus === "inDelivery") {
            sendOrderUpdateEmail(user.email, order);
        }

        res.status(200).json({
            success : true,
            message : "Order status is updated successfully"
        })

    } catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Error",
        });
    }
};

    // Function to send an email
const sendOrderUpdateEmail = async (userEmail, order) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "madhushanfourth@gmail.com",  // Replace with your email
                pass: "bdyc rlgt xkfb mabr",  // Replace with your app password
            },
        });

        // Extract order details
        const { _id, cartItems, totalAmount, addressInfo, paymentMethod, paymentStatus } = order;

        // Format cart items into a readable list
        let itemsList = cartItems
            .map(
                (item) =>
                    `<li>${item.title} - ${item.quantity} x ${item.price} LKR</li>`
            )
            .join("");

            let mailOptions = {
                from: "madhushanfourth@gmail.com",
                to: userEmail,
                subject: "Your Order is Out for Delivery!",
                html: `
                    <h3>Your order (Order ID: ${_id}) is now in delivery!</h3>
                    <p>Dear Customer,</p>
                    <p>We are pleased to inform you that your order is now being delivered.</p>
                    
                    <h4>Order Details:</h4>
                    <ul>
                        ${itemsList}
                    </ul>
                    
                    <p><strong>Total Amount:</strong> ${totalAmount} LKR</p>
                    <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                    <p><strong>Payment Status:</strong> ${paymentStatus}</p>
                    
                    <h4>Delivery Address:</h4>
                    <p>${addressInfo.address}, ${addressInfo.city}, ${addressInfo.postalcode}</p>
                    <p>Phone: ${addressInfo.phone}</p>
                    <p>Notes: ${addressInfo.notes}</p>
    
                    <br>
                    <p>Thank you for shopping with us!</p>
                    <br>
                    <p>Best Regards,</p>
                    <p>OceanFishMarket.lk</p>
                `,
            };

        await transporter.sendMail(mailOptions);
        console.log("Order status email sent successfully!");

    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus };

