import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCalorie } from '../context/CalorieDataContext';

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { getCalorieDataForDate } = useCalorie();
  const [message, setMessage] = useState('');

  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const changeMonth = (amount: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
  });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = ['日', '月', '火', '水', '木', '金', '土'];

  const today = getToday();

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => changeMonth(-1)}
          className="rounded-full bg-orange-300 px-4 py-2 text-white shadow-md"
        >
          &lt;
        </button>
        <h1 className="text-xl font-bold text-orange-500">{monthName}</h1>
        <button
          onClick={() => changeMonth(1)}
          className="rounded-full bg-orange-300 px-4 py-2 text-white shadow-md"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 rounded-xl bg-white p-2 text-center shadow-md">
        {days.map((day) => (
          <div key={day} className="text-sm font-bold text-gray-600">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, day) => {
          const dayNumber = day + 1;
          const monthString = String(month + 1).padStart(2, '0');
          const dayString = String(dayNumber).padStart(2, '0');
          const dateString = `${year}-${monthString}-${dayString}`;
          const isFuture = dateString > today;
          const data = getCalorieDataForDate(dateString);

          const totalExpenditure =
            (data?.expenditure || 0) + (data?.basalMetabolism || 0);
          const difference = data ? data.intake - totalExpenditure : 0;

          let bgColor = 'bg-gray-100';
          if (data) {
            bgColor = difference >= 0 ? 'bg-red-200' : 'bg-blue-200';
          }

          const dayCellContent = (
            <>
              <span
                className={`text-xs font-semibold ${
                  isFuture ? 'text-gray-400' : ''
                }`}
              >
                {dayNumber}
              </span>
              <div className="mt-1 leading-tight text-[8px]">
                {data ? (
                  <>
                    <p className="text-red-500">🍔: {data.intake}</p>
                    <p className="text-blue-500">🔥: {totalExpenditure}</p>
                    <p className="font-bold text-gray-700">
                      {difference > 0 ? `+${difference}` : difference}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="invisible">🍔: 0</p>
                    <p className="invisible">🔥: 0</p>
                    <p className="invisible font-bold">0</p>
                  </>
                )}
              </div>
            </>
          );

          const baseClasses = `relative flex aspect-square flex-col items-center justify-start rounded-lg border border-gray-200 p-1 ${bgColor}`;

          if (isFuture) {
            return (
              <div
                key={dayNumber}
                className={`${baseClasses} cursor-not-allowed`}
                onClick={() => {
                  setMessage('未来の日付には記録できません。');
                  setTimeout(() => setMessage(''), 2000);
                }}
              >
                {dayCellContent}
              </div>
            );
          }

          return (
            <Link
              to={`/record/${dateString}`}
              key={dayNumber}
              className={`${baseClasses} cursor-pointer hover:ring-2 hover:ring-orange-400`}
            >
              {dayCellContent}
            </Link>
          );
        })}
      </div>
      {message && (
        <p className="mt-4 text-center text-red-600">{message}</p>
      )}
    </div>
  );
};

export default CalendarPage;
