import React, { useState, useEffect } from 'react';

export default function CustomerDashboard({ user, onEditProfile, onBookVehicle }) {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the real data from Oracle and FORCE it to skip the cache!
  useEffect(() => {
    // Safety check: Ensure we actually have a logged-in user ID
    if (!user || !user.id) {
      console.error("No user ID found! Cannot fetch rentals.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8081/api/rentals/customer/${user.id}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache', // Forces browser to pull fresh data
        'Pragma': 'no-cache'
      }
    })
      .then(res => res.json())
      .then(data => {
        setRentals(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching user rentals:", err);
        setLoading(false);
      });
  }, [user]);

  // --- Dynamic Math for your Stats Row ---
  const activeRentals = rentals.filter(r => r.rentalStatus === 'Active');
  const totalSpent = rentals.reduce((sum, r) => sum + (r.totalCost || 0), 0);
  const totalRentals = rentals.length;

  return (
    <div className="max-w-6xl mx-auto flex gap-8">
      
      {/* Left Column - Main Content */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back, {user.fullName || 'User'}!</h1>
            <p className="text-gray-500">Here's what's happening with your rentals today</p>
          </div>
          
          <button onClick={onBookVehicle} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
             Book A Vehicle
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Active Rentals</p>
            <h3 className="text-2xl font-bold">{activeRentals.length}</h3>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Upcoming Bookings</p>
            <h3 className="text-2xl font-bold">0</h3>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Total Spent</p>
            <h3 className="text-2xl font-bold">{totalSpent}tk</h3>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Total Rentals</p>
            <h3 className="text-2xl font-bold">{totalRentals}</h3>
          </div>
        </div>

        {/* Active Rentals Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Active Rentals</h3>
          
          {loading ? (
            <div className="p-4 text-gray-500 text-sm">Loading your vehicles...</div>
          ) : activeRentals.length === 0 ? (
            <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              You don't have any active rentals. Click "Book a Vehicle" to get started!
            </div>
          ) : (
            <div className="space-y-4">
              {activeRentals.map((rental, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4 flex justify-between items-center bg-gray-50 hover:shadow-sm transition-shadow">
                  <div>
                    <p className="font-bold text-gray-900">
                      {rental.vehicleName || 'Vehicle'} 
                      <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded ml-2 uppercase tracking-wider">
                        {rental.rentalStatus}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Rental ID: r-{(rental.rentId || 0).toString().padStart(4, '0')} • {rental.pickupDate} to {rental.returnDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{rental.totalCost}tk</p>
                    <p className="text-xs text-gray-400 mb-2">{rental.paymentStatus}</p>
                    <button className="border border-gray-300 px-4 py-1 rounded bg-white text-xs font-medium hover:bg-gray-50 transition-colors">View</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Sidebar */}
      <div className="w-80 space-y-6">
        
        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button onClick={onBookVehicle} className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition">Book A Vehicle</button>
            <button className="w-full border border-gray-300 font-medium py-2 rounded-lg hover:bg-gray-50 transition">View All Bookings</button>
          </div>
        </div>

        {/* Profile Summary Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">👤</div>
          <h3 className="font-bold text-lg">{user.fullName || 'User'}</h3>
          <p className="text-sm text-gray-500 mb-4">{user.email}</p>
          
          <button onClick={onEditProfile} className="w-full border border-gray-300 font-medium py-2 rounded-lg hover:bg-gray-50 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}