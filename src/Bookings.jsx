import React, { useState, useEffect } from 'react';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8081/api/rentals')
      .then(res => res.json())
      .then(data => { setBookings(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  // Styling helpers for Figma accuracy
  const getStatusStyle = (status) => {
    if (status === 'Active') return 'bg-green-100 text-green-600';
    if (status === 'Completed') return 'bg-blue-100 text-blue-600';
    if (status === 'Late') return 'bg-red-100 text-red-600';
    return 'bg-gray-100 text-gray-600';
  };

  const getPaymentStyle = (status) => {
    if (status === 'Paid') return 'bg-green-100 text-green-600';
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-600';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="ml-[5px] bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">Manage Bookings</h2>
        <div className="flex gap-4">
           <input type="text" placeholder="Search" className="border border-gray-300 rounded-lg px-4 py-2 text-sm" />
           <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm font-medium">Filter by status</button>
           <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm font-medium">Filter by date</button>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm text-center text-gray-600">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Rental_id</th>
              <th className="px-6 py-4 font-semibold text-left">Vehicle</th>
              <th className="px-6 py-4 font-semibold">Pickup_Date</th>
              <th className="px-6 py-4 font-semibold">Return_Date</th>
              <th className="px-6 py-4 font-semibold">Total</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Payment</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="7" className="p-4">Loading...</td></tr> : null}
            {bookings.map((b, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">r-{(b.rentId || 0).toString().padStart(4, '0')}</td>
                <td className="px-6 py-4 text-left font-bold text-gray-800 flex items-center gap-3">
                  {/* Mocking the car image for layout */}
                  <div className="w-12 h-8 bg-gray-200 rounded">🚗</div> 
                  {b.vehicleName || 'Unknown Vehicle'}
                </td>
                <td className="px-6 py-4">{b.pickupDate}</td>
                <td className="px-6 py-4">{b.returnDate}</td>
                <td className="px-6 py-4 font-medium">{b.totalCost}tk</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(b.rentalStatus)}`}>{b.rentalStatus}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStyle(b.paymentStatus)}`}>{b.paymentStatus}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}