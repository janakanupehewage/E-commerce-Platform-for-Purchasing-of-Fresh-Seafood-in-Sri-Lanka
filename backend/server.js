require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-route');
const adminProductsRouter = require('./routes/admin/products-routes');
const adminOrderRouter = require('./routes/admin/order-routes');
const adminNutrientRouter = require('./routes/admin/nutrients-routes');
const adminDashboardRouter = require('./routes/admin/admin-dashboardRoutes');
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const shopNutrientRouter = require("./routes/shop/nutrients-routes");
const commonUIBannerRouter = require("./routes/common/uibanner-routes");
const contactRouter = require("./routes/shop/contact-routes");

mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>console.log("Database Connected"))
.catch((error)=>console.log(error));

const app = express()
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : process.env.CLIENT_BASE_URL,
        methods : ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders : [
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
//app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/nutrientsHandle", adminNutrientRouter);
app.use("/api/admin/dashboard", adminDashboardRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/nutrientCalculation", shopNutrientRouter);

app.use("/api/common/banner", commonUIBannerRouter);
app.use("/api/shop/contact", contactRouter);


app.listen(PORT, ()=>console.log(`Backend Server Running on Port ${PORT}`));
