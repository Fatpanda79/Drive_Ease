import React, { useState, useEffect } from 'react';

export default function BrowseVehicles({ user, bookingDates, onBack, onBookingComplete }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all vehicles when the page loads
  useEffect(() => {
    fetch('http://localhost:8081/api/vehicles')
      .then(res => res.json())
      .then(data => {
        // Only show cars that are currently available!
        const availableCars = data.filter(v => v.availabilityStatus?.toLowerCase() === 'available');
        setVehicles(availableCars);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleBookCar = (vehicle) => {
    if (!window.confirm(`Confirm booking for ${vehicle.vehicleName}?`)) return;

    // Calculate mock total based on price per day (assume 3 days for mockup)
    const total = vehicle.pricePerDay * 3; 

    const newBooking = {
      customerId: user.id,
      vehicleId: vehicle.vid,
      vehicleName: vehicle.vehicleName,
      pickupDate: bookingDates.pickupDate,
      returnDate: bookingDates.returnDate,
      totalCost: total,
      rentalStatus: 'Active',
      paymentStatus: 'Pending'
    };

    // Send the POST request to our new endpoint
    fetch('http://localhost:8081/api/rentals/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking)
    })
    .then(res => {
      if(res.ok) {
        alert("Vehicle booked successfully!");
        onBookingComplete(); // Send user back to dashboard
      } else {
        alert("Booking failed. Please try again.");
      }
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="max-w-7xl mx-auto flex gap-8">
      
      {/* Left Sidebar - Filters (Visual match to Figma) */}
      <div className="w-64 shrink-0">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Browse vehicles</h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">Find your perfect ride from our extensive collection of cars and bikes</p>
        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Filters</h3>
            <button className="text-orange-500 text-sm hover:underline">Reset</button>
          </div>
          
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-gray-600 mb-1">Search</label>
              <input type="text" placeholder="Search vehicles..." className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Vehicle Type</label>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button className="flex-1 py-2 bg-gray-50 text-xs font-medium border-r border-gray-300">All</button>
                <button className="flex-1 py-2 text-xs font-medium border-r border-gray-300 hover:bg-gray-50">Car</button>
                <button className="flex-1 py-2 text-xs font-medium hover:bg-gray-50">Bike</button>
              </div>
            </div>
            {/* Additional mock filters can go here */}
          </div>
          <button onClick={onBack} className="w-full mt-6 text-gray-500 hover:text-orange-500 text-sm font-medium">← Back to Dates</button>
        </div>
      </div>

      {/* Right Area - Car Grid */}
      <div className="flex-1">
        {loading ? (
          <div className="text-center p-10 text-gray-500">Loading available vehicles...</div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {vehicles.map((v, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Mock Image Area */}
                <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-4xl">
                  {v.model?.toLowerCase().includes('bike') ? '🏍️' : '🚗'}
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-gray-900">{v.vehicleName}</h3>
                    <span className="text-sm font-bold flex items-center gap-1">★ 4.5</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider">{v.model}</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xl font-black text-gray-900">${v.pricePerDay}</p>
                      <p className="text-xs text-gray-500">Per day</p>
                    </div>
                    {/* The crucial BOOK button */}
                    <button onClick={() => handleBookCar(v)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {vehicles.length === 0 && (
              <div className="col-span-3 text-center p-10 text-gray-500">No vehicles are currently available for these dates.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}