import React, { useState, useEffect } from 'react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Oracle Database on load
  useEffect(() => {
    fetch('http://localhost:8081/api/users/customers')
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching customers:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading customers...</div>;
  }

  return (
    <div className="ml-[5px] bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">Manage Customers</h2>
        <div className="text-right">
          {/* Dynamically count the customers */}
          <span className="text-orange-500 font-bold text-2xl">{customers.length}</span>
          <p className="text-gray-500 text-xs uppercase">Total Customers</p>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">E-mail</th>
              <th className="px-6 py-4 font-semibold">Phone</th>
              <th className="px-6 py-4 font-semibold">Address</th>
              <th className="px-6 py-4 font-semibold">License</th>
              <th className="px-6 py-4 font-semibold">Reg-Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                  <span className="text-orange-500">👤</span> {c.fullName}
                </td>
                <td className="px-6 py-4">{c.email}</td>
                {/* Fallbacks in case the DB has null values */}
                <td className="px-6 py-4">{c.phoneNumber || '-'}</td>
                <td className="px-6 py-4 max-w-[150px] truncate text-gray-500 italic">
                  {c.address || 'Not Provided'}
                </td>
                <td className="px-6 py-4 text-gray-500 italic">
                  {c.licenseNumber || 'Not Provided'}
                </td>
                <td className="px-6 py-4">{c.registrationDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${
                    c.accountStatus === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {c.accountStatus}
                  </span>
                </td>
              </tr>
            ))}
            
            {/* Show a message if no customers exist yet */}
            {customers.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  No customers found. Go create one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}