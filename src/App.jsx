import { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Vehicles from './Vehicles';

function App() {
  const [currentPage, setCurrentPage] = useState('VEHICLES');
  
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
            <h2 className="text-2xl font-bold text-gray-800">Currently Page: {currentPage}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;