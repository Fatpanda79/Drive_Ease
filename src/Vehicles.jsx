import React, { useState, useEffect } from 'react';
import AddVehicle from './AddVehicle';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/api/vehicles')
      .then(response => response.json())
      .then(data => {
        setVehicles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      fetch(`http://localhost:8081/api/vehicles/${id}`, {
        method: 'DELETE',
      })
      .then(() => {
        setVehicles(vehicles.filter(v => v.vid !== id));
      })
      .catch(error => console.error("Error deleting vehicle:", error));
    }
  };

  const handleEditClick = (vehicle) => 
    {
    setEditingVehicle(vehicle); 
    setShowForm(true);          
  };

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === 'available') return 'bg-green-100 text-green-600';
    if (s === 'rented') return 'bg-blue-100 text-blue-600';
    if (s === 'unavailable') return 'bg-red-100 text-red-600';
    return 'bg-gray-100 text-gray-600';
  };

  if (showForm) {
    return (
      <AddVehicle 
        editingVehicle={editingVehicle}
        onCancel={() =>{
          setShowForm(false);
          setEditingVehicle(null); 
        }} 
        onSave={(savedVehicle, isUpdating) => {
          if(isUpdating){
            setVehicles(vehicles.map(v => v.vid === savedVehicle.vid ? savedVehicle : v));
          } 
          else{
            setVehicles([...vehicles, savedVehicle]); 
          }
          setShowForm(false);
          setEditingVehicle(null);
        }} 
      />
    );
  }

  return (
    <div className="ml-3.75 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-blue-700 tracking-wide uppercase">Manage Vehicles</h2>
        <button onClick={() => { setEditingVehicle(null); setShowForm(true); }} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium transition-colors flex items-center gap-2 text-sm">
          <span>+</span> Add Vehicle
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <input type="text" placeholder="Search" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500" />
        </div>
        <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-50">
          Filter
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading vehicles...</div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 capitalize bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Vehicles</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Registration</th>
                <th className="px-6 py-4 font-semibold">Manufacture</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Price/day</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">{v.vehicleName}</td>
                  <td className="px-6 py-4">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">{v.model}</span>
                  </td>
                  <td className="px-6 py-4">{v.registrationNo}</td>
                  <td className="px-6 py-4">{v.manufacturingYear}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusStyle(v.availabilityStatus)}`}>
                      {v.availabilityStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{v.pricePerDay}tk</td>
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <button onClick={() => handleEditClick(v)} className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 text-xs font-medium">Update</button>
                    
                    <button onClick={() => handleDelete(v.vid)} className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 text-xs font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}