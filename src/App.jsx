import { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Vehicles from './Vehicles';
import Auth from './Auth';

function App() {
  const [currentPage, setCurrentPage] = useState('VEHICLES');
  
  // NEW: State to track if the user has successfully logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // --- TESTING HARNESS ---
  // If the user is NOT authenticated, force the screen to show the Auth component.
  // The Auth component handles toggling between Login and Signup internally!
  if (!isAuthenticated) {
    return (
      <Auth 
        onLoginSuccess={() => setIsAuthenticated(true)} 
      />
    );
  }

  // --- YOUR MAIN APP (Hidden until they log in) ---
  return (
    <div className="flex bg-gray-50 min-h-screen w-full overflow-x-hidden">
      <Navbar 
        activeItem={currentPage} 
        onSelectItem={setCurrentPage} 
      />

      <div className="flex-1 pl-60 p-10 min-w-0 box-border">
        {currentPage === 'VEHICLES' ? (
          <Vehicles />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800">Currently viewing: {currentPage}</h2>
            <p className="text-gray-500 mt-2">This module is under construction.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;