import React from 'react';
import { NavbarItem } from './NavbarItem';

export default function Navbar({ activeItem, onSelectItem }) {
  const navItems = ['DASHBOARD','VEHICLES','CUSTOMERS',
    'BOOKINGS','RESERVATION','EMPLOYEES','BRANCHES','MAINTENANCE',
    'PAYMENTS','BACK TO HOME'
  ];

  return (
    <nav className="w-60 h-screen fixed left-0 top-0 flex flex-col pt-6 z-10 bg-linear-to-b from-blue-800 to-blue-900 ">
      <div className="text-white text-2xl font-bold px-6 pb-8 tracking-[0.5px]">
        DriveEase
      </div>
      <div className="subtle-scrollbar overflow-y-auto flex flex-col h-full">
        {navItems.map((item) => (
          <NavbarItem
            key={item}
            label={item}
            isActive={activeItem === item}
            onClick={onSelectItem}
          />
        ))}
      </div>
    </nav>
  );
}