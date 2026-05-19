import React, { useState } from 'react';

export default function BookVehicle({ onNext, onBack }) {
  const [dates, setDates] = useState({
    pickupDate: '',
    returnDate: '',
  });

  const handleNext = (e) => {
    e.preventDefault();
    onNext(dates); // Pass the dates to the App.jsx state!
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Book a New Vehicle</h2>
        <button onClick={onBack} className="text-gray-500 hover:text-orange-500 font-medium text-sm">← Back to Dashboard</button>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
            <input type="date" required value={dates.pickupDate} onChange={(e) => setDates({...dates, pickupDate: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
            <input type="date" required value={dates.returnDate} onChange={(e) => setDates({...dates, returnDate: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none" />
          </div>
        </div>

        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors mt-8">
          Next: Browse Vehicles →
        </button>
      </form>
    </div>
  );
}