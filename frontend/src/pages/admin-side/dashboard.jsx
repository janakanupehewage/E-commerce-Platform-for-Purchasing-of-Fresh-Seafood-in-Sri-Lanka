import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { FaUsers, FaBoxOpen, FaShoppingCart } from 'react-icons/fa';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [revenueData, setRevenueData] = useState([]); // For revenue chart

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/dashboard/stats");
        setStats(response.data);
        setChartData(response.data.ordersByMonth);
        setRevenueData(response.data.revenueByMonth); // Set revenue data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const cardStyle = "flex items-center gap-4 p-6 bg-white shadow-md rounded-2xl hover:shadow-xl transition duration-300";
  const iconStyle = "text-3xl text-indigo-600";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      <Card className={cardStyle}>
        <FaUsers className={iconStyle} />
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-indigo-800">{stats.totalUsers}</p>
        </CardContent>
      </Card>

      <Card className={cardStyle}>
        <FaBoxOpen className={iconStyle} />
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
          <p className="text-3xl font-bold text-indigo-800">{stats.totalProducts}</p>
        </CardContent>
      </Card>

      <Card className={cardStyle}>
        <FaShoppingCart className={iconStyle} />
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
          <p className="text-3xl font-bold text-indigo-800">{stats.totalOrders}</p>
        </CardContent>
      </Card>

      <Card className={cardStyle}>
        <span className="text-3xl text-indigo-600">රු</span>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-3xl font-bold text-indigo-800">
            <span className="text-xl font-medium text-gray-600">Rs.</span>{' '}
            {stats.totalRevenue.toLocaleString('en-IN')}
          </p>
        </CardContent>
      </Card>

      {/* Orders Overview */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <Card className="p-6 bg-white shadow-md rounded-2xl hover:shadow-xl transition duration-300">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Orders Overview</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="orders" fill="#4F46E5" barSize={40} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Overview */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <Card className="p-6 bg-white shadow-md rounded-2xl hover:shadow-xl transition duration-300">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Revenue Overview</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', borderRadius: '8px' }} 
                  formatter={(value) => [`Rs. ${value.toLocaleString('en-IN')}`, 'Revenue']} 
                />
                <Legend />
                <Bar dataKey="revenue" fill="#16A34A" barSize={40} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
