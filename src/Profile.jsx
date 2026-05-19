import React, { useState } from 'react';

export default function Profile({ user, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    address: user.address || '',
    licenseNumber: user.licenseNumber || '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Send the updated data to Spring Boot
    fetch(`http://localhost:8081/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...user, // Keep existing data like password/role intact
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        licenseNumber: formData.licenseNumber
      }),
    })
    .then(response => response.json())
    .then(updatedUser => {
      alert("Profile updated successfully!");
      setIsEditing(false);
      // Tell App.jsx to use the fresh data!
      if (onUpdateUser) {
          onUpdateUser(updatedUser); 
      }
    })
    .catch(error => console.error("Error updating profile:", error));
  };

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Header Area */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back, {formData.fullName || 'User'}!</h1>
          <p className="text-gray-500">Manage your personal information and security settings here.</p>
        </div>
        
        {/* The Master Toggle Button */}
        {isEditing ? (
          <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
            💾 SAVE CHANGES
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
            📝 EDIT
          </button>
        )}
      </div>

      <div className="flex gap-8">
        {/* LEFT COLUMN: Static Profile Summary Card */}
        <div className="w-80">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
              👤
            </div>
            <p className="text-sm text-gray-500 mb-1">{user.email}</p>
            <h3 className="font-bold text-xl mb-6">{formData.fullName}</h3>
            
            <div className="space-y-3 text-sm text-left border-t border-gray-100 pt-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Member Since</span>
                <span className="font-medium text-gray-900">{user.registrationDate || 'Today'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Rentals</span>
                <span className="font-medium text-gray-900">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account Status</span>
                <span className="text-green-500 font-bold">{user.accountStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Editable Forms */}
        <div className="flex-1 space-y-6">
          
          {/* Personal Information */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Personal Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${isEditing ? 'border-orange-500 bg-white' : 'border-gray-200 bg-gray-50 text-gray-500'}`} />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">E-mail (Cannot be changed)</label>
                <input type="email" name="email" value={formData.email} disabled className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${isEditing ? 'border-orange-500 bg-white' : 'border-gray-200 bg-gray-50 text-gray-500'}`} placeholder="+880..." />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${isEditing ? 'border-orange-500 bg-white' : 'border-gray-200 bg-gray-50 text-gray-500'}`} placeholder="Your home address" />
              </div>
            </div>
          </div>

          {/* Driving License Information */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Driving License Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-500 mb-1">License Number</label>
                <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${isEditing ? 'border-orange-500 bg-white' : 'border-gray-200 bg-gray-50 text-gray-500'}`} placeholder="e.g. D-123456" />
              </div>
              <div>
                {/* Visual placeholder for Figma accuracy - not saving to DB right now */}
                <label className="block text-sm text-gray-500 mb-1">Expiry Date</label>
                <input type="text" disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${isEditing ? 'border-orange-500 bg-white' : 'border-gray-200 bg-gray-50 text-gray-500'}`} placeholder="DD-MM-YYYY" />
              </div>
            </div>
          </div>

          {/* Security (Visual Mockup based on Figma) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm opacity-60">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-800">Security</h3>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Coming Soon</span>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-700">Password</p>
                <p className="text-sm text-gray-400">Changed 3 months ago</p>
              </div>
              <button disabled className="border border-gray-300 text-gray-500 px-4 py-1.5 rounded text-sm">Change Password</button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-700">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Not enabled</p>
              </div>
              <button disabled className="border border-gray-300 text-gray-500 px-4 py-1.5 rounded text-sm">Enable</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}