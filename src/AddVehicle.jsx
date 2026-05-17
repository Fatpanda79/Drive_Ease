import React, { useState } from 'react';

export default function AddVehicle({ onCancel, onSave, editingVehicle }) {
  
 
  const [formData, setFormData] = useState(
    editingVehicle || {
      vehicleName: '',
      model: '',
      registrationNo: '',
      manufacturingYear: '',
      availabilityStatus: 'available',
      pricePerDay: ''
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const isUpdating = !!editingVehicle;
    const url = isUpdating 
      ? `http://localhost:8081/api/vehicles/${editingVehicle.vid}` 
      : 'http://localhost:8081/api/vehicles';
      
    const method = isUpdating ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(savedVehicle => {
      onSave(savedVehicle, isUpdating); 
    })
    .catch(error => console.error("Error saving vehicle:", error));
  };

  return (
    <div className="ml-25.25 bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl">
      <div className="mb-6">
        {/* Change the title dynamically */}
        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
          {editingVehicle ? "Update Vehicle" : "Add New Vehicle"}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {editingVehicle ? "Edit the details below." : "Enter the details for the new vehicle below."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name</label>
            <input type="text" name="vehicleName" required value={formData.vehicleName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="e.g. Toyota Corolla" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <input type="text" name="model" required value={formData.model} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="e.g. SUV, CAR, BIKE" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registration No.</label>
            <input type="text" name="registrationNo" required value={formData.registrationNo} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="e.g. dhk-2024-12" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Manufacture Year</label>
            <input type="number" name="manufacturingYear" required value={formData.manufacturingYear} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="e.g. 2022" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price/Day (tk)</label>
            <input type="number" name="pricePerDay" required value={formData.pricePerDay} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="e.g. 15000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="availabilityStatus" value={formData.availabilityStatus} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 bg-white">
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button type="button" onClick={onCancel} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            {/* Change button text dynamically */}
            {editingVehicle ? "Update Vehicle" : "Save Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
}