import React, { useState } from 'react';

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true); // Toggles between Login and Signup
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- HARDCODED ADMIN CHECK ---
    if (isLogin && formData.email === 'admin@gmail.com' && formData.password === 'admin') {
      onLoginSuccess({ name: 'Admin', role: 'ADMIN' });
      return; // Stop here, don't ping the database
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    
    fetch(`http://localhost:8081${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(async (res) => {
      if (res.ok) {
        if (isLogin) {
          const userData = await res.json();
          // Ensure the database user is tagged as a normal USER role
          onLoginSuccess({ ...userData, role: 'USER' }); 
        } else {
          alert("Account created! Please log in.");
          setIsLogin(true);
        }
      } else {
        const errText = await res.text();
        setError(errText || "Authentication failed");
      }
    })
    .catch(err => setError("Server error. Please try again."));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        
        {/* Logo Area */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 text-orange-500 font-bold text-xl mb-2">
            <span className="text-2xl"></span> DriveEase
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-500 text-sm mt-1 text-center">
            {isLogin ? "Sign in to your Account to Continue" : "Join DriveEase and start your journey today"}
          </p>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Show Name and Phone only if Signing Up */}
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="fullName" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500" placeholder="Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="text" name="phoneNumber" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500" placeholder="+880 1319946481" />
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" name="email" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500" placeholder="abcd@gmail.com" />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500" placeholder="••••••••" />
          </div>

          {/* Confirm Password only if Signing Up */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input type="password" name="confirmPassword" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500" placeholder="••••••••" />
            </div>
          )}

          {/* Remember Me / Forgot Password (Login Only) */}
          {isLogin && (
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded text-orange-500 focus:ring-orange-500" /> Remember me
              </label>
              <a href="#" className="text-orange-500 hover:underline">Forgot Password?</a>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-colors mt-4">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle between Login and Signup */}
        <div className="text-center mt-6 text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-orange-500 font-medium hover:underline">
            {isLogin ? "Sign up" : "Sign In"}
          </button>
        </div>

        {/* Social Buttons (Visuals matching your Figma) */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500 uppercase">Or continue with</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
              <span className="font-bold text-gray-700">G Google</span>
            </button>
            <button className="flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
              <span className="font-bold text-gray-700">f Facebook</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}