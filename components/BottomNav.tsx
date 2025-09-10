import React from 'react';
import { NavLink } from 'react-router-dom';
import CalendarIcon from './CalendarIcon';
import ChartIcon from './ChartIcon';
import PencilIcon from './PencilIcon';

const BottomNav: React.FC = () => {
  const activeLinkClass = 'text-orange-500';
  const inactiveLinkClass = 'text-gray-500';

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white shadow-lg">
      <div className="mx-auto flex max-w-md justify-around">
        <NavLink
          to="/record"
          className={({ isActive }) =>
            `flex w-full flex-col items-center justify-center p-3 ${
              isActive ? activeLinkClass : inactiveLinkClass
            }`
          }
        >
          <PencilIcon className="h-6 w-6" />
          <span className="text-xs">記録</span>
        </NavLink>
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `flex w-full flex-col items-center justify-center p-3 ${
              isActive ? activeLinkClass : inactiveLinkClass
            }`
          }
        >
          <CalendarIcon className="h-6 w-6" />
          <span className="text-xs">カレンダー</span>
        </NavLink>
        <NavLink
          to="/graph"
          className={({ isActive }) =>
            `flex w-full flex-col items-center justify-center p-3 ${
              isActive ? activeLinkClass : inactiveLinkClass
            }`
          }
        >
          <ChartIcon className="h-6 w-6" />
          <span className="text-xs">グラフ</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
