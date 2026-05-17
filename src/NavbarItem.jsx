
import React from 'react';

export const NavbarItem = ({ label, isActive, onClick }) => {
  return (
    <div 
      onClick={() => onClick(label)}
      role="button"
      tabIndex={0}
      className={`px-6 py-3 cursor-pointer text-sm w-full box-border flex items-center transition-all duration-200 ease-in-out
        ${isActive 
          ? 'bg-linear-to-br from-orange-500 to-orange-600 text-white font-semibold' 
          : 'bg-transparent text-slate-300 hover:text-white hover:bg-white/10 font-normal'
        }
      `}
    >
      {label}
    </div>
  );
};