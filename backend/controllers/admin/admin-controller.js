const User = require('../../models/User');
const Product = require('../../models/Product');
const Order = require('../../models/Order');

// Get Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const totalRevenue = await Order.aggregate([
      { $match: { orderStatus: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const ordersByMonth = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$orderDate' },
            month: { $month: '$orderDate' }
          },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]).then(data =>
      data.map(item => ({
        month: `${['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'][item._id.month - 1]} ${item._id.year}`,
        orders: item.orders,
      }))
    );

    // Revenue by Month
    const revenueByMonth = await Order.aggregate([
      { $match: { orderStatus: 'confirmed' } }, // Only confirmed orders
      {
        $group: {
          _id: {
            year: { $year: '$orderDate' },
            month: { $month: '$orderDate' }
          },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]).then(data =>
      data.map(item => ({
        month: `${['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'][item._id.month - 1]} ${item._id.year}`,
        revenue: item.revenue,
      }))
    );

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      ordersByMonth,
      revenueByMonth,  // ✅ Add this line
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

  

module.exports = {
  getDashboardStats,
};
