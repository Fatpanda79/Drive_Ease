import { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Vehicles from './Vehicles';
import Customers from './Customers'; 
import Auth from './Auth';
import CustomerDashboard from './CustomerDashboard'; 
import Profile from './Profile'; 
import Bookings from './Bookings'; 
import BookVehicle from './BookVehicle'; 
import BrowseVehicles from './BrowseVehicles';

function App() {
  const [user, setUser] = useState(null); // Stores the logged-in user data & role
  const [adminPage, setAdminPage] = useState('VEHICLES');
  const [customerPage, setCustomerPage] = useState('DASHBOARD'); 

  // NEW: Track the dates selected in Step 1 of booking
  const [bookingDates, setBookingDates] = useState(null); 

  // 1. NOT LOGGED IN
  if (!user) {
    return <Auth onLoginSuccess={(userData) => setUser(userData)} />;
  }

  // 2. ADMIN VIEW (Blue Sidebar Layout)
  if (user.role === 'ADMIN') {
    return (
      <div className="flex bg-gray-50 min-h-screen w-full overflow-x-hidden">
        <Navbar activeItem={adminPage} onSelectItem={setAdminPage} />
        <div className="flex-1 pl-60 p-10 min-w-0 box-border">
          {adminPage === 'VEHICLES' && <Vehicles />}
          {adminPage === 'CUSTOMERS' && <Customers />}
          {adminPage === 'BOOKINGS' && <Bookings />}
        </div>
      </div>
    );
  }

  // 3. CUSTOMER VIEW (Top Nav Layout)
  if (user.role === 'USER') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col w-full">
        {/* Simple Top Nav for Customer */}
        <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-xl cursor-pointer" onClick={() => setCustomerPage('DASHBOARD')}>
            <span className="text-2xl">🚗</span> DriveEase
          </div>
          
          <div className="flex gap-6 font-medium text-gray-700">
            <button onClick={() => setCustomerPage('DASHBOARD')} className="hover:text-orange-500">Home</button>
            <button className="hover:text-orange-500">Vehicles</button>
            <button className="hover:text-orange-500">How it works</button>
            <button className="hover:text-orange-500">Contact</button>
          </div>
          
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer" onClick={() => setCustomerPage('PROFILE')}>
            👤
          </div>
        </div>

        {/* Dynamic Page Content */}
        <div className="flex-1 p-8">
          {customerPage === 'DASHBOARD' && (
            <CustomerDashboard 
              user={user} 
              onEditProfile={() => setCustomerPage('PROFILE')} 
              onBookVehicle={() => setCustomerPage('BOOK_VEHICLE')} 
            />
          )}

          {customerPage === 'PROFILE' && (
            <Profile 
              user={user} 
              onUpdateUser={setUser} 
            />
          )}

          {customerPage === 'BOOK_VEHICLE' && (
            <BookVehicle 
              onBack={() => setCustomerPage('DASHBOARD')} 
              onNext={(dates) => {
                setBookingDates(dates); // Save the dates!
                setCustomerPage('BROWSE_VEHICLES'); // Move to Step 2
              }} 
            />
          )}

          {customerPage === 'BROWSE_VEHICLES' && (
            <BrowseVehicles 
              user={user} 
              bookingDates={bookingDates} // Pass the dates down to Step 2
              onBack={() => setCustomerPage('BOOK_VEHICLE')} // Go back to dates
              onBookingComplete={() => setCustomerPage('DASHBOARD')} // Success! Go home.
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;