import React, { useState, useMemo } from 'react';
import './calendar.scss';

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

const SCalendar: React.FC<CalendarProps> = ({ value = new Date(), onChange }) => {
  const [currentDate, setCurrentDate] = useState(value);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const result: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      result.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      result.push(i);
    }
    return result;
  }, [year, month]);

  const isToday = (d: number | null) => {
    if (!d) return false;
    const today = new Date();
    return d === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear();
  };

  const isSelected = (d: number | null) => {
    if (!d) return false;
    return d === day;
  };

  const selectDay = (d: number | null) => {
    if (d !== null) {
      const newDate = new Date(year, month - 1, d);
      setCurrentDate(newDate);
      onChange?.(newDate);
    }
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 2, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month, 1));

  return (
    <div className="sw-calendar">
      <div className="sw-calendar__header">
        <span className="sw-calendar__title">{year}年{monthNames[month - 1]}</span>
        <div className="sw-calendar__nav">
          <button className="sw-calendar__nav-btn" onClick={prevMonth}>‹</button>
          <button className="sw-calendar__nav-btn" onClick={nextMonth}>›</button>
        </div>
      </div>
      <div className="sw-calendar__week">
        {weekDays.map(d => <span key={d} className="sw-calendar__week-item">{d}</span>)}
      </div>
      <div className="sw-calendar__days">
        {calendarDays.map((d, index) => (
          <div
            key={index}
            className={`sw-calendar__day ${d === null ? 'sw-calendar__day--other' : ''} ${isToday(d) ? 'sw-calendar__day--today' : ''} ${isSelected(d) ? 'sw-calendar__day--selected' : ''}`}
            onClick={() => selectDay(d)}
          >
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SCalendar;