import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/authentication-slice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: ''
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    return newErrors;
  };

  // Submit function
  function onSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        //navigate('/home'); // Redirect to the home page upon successful login
      } else {
        toast({
          title: data?.payload?.message,
          variant: 'destructive',
        });
      }
    });
  }

  return (
    <>
    {/* Continue as Guest Button */}
    <button 
        onClick={() => navigate('/')} 
        className="absolute top-4 right-4 bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
      >
        Continue as Guest
    </button>

    <div className="mx-auto w-full max-w-md space-y-6 relative">
      

      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Log in to your account</h1>
        <p className="mt-2">Don't have an account?
          <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/register'>Register</Link>
        </p>
      </div>

      {/* Form with validation */}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Log In
        </button>
      </form>
    </div>
    </>
  );
}

export default AuthLogin;
