import React, { useState, useMemo } from 'react';
import { SInput } from '../input';
import './date-picker.scss';

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const SDatePicker: React.FC<DatePickerProps> = ({
  value = '',
  onChange,
  placeholder = '请选择日期',
}) => {
  const [isShow, setIsShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const result: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      result.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      result.push(i);
    }
    return result;
  }, [currentYear, currentMonth]);

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const selectDay = (day: number) => {
    const date = `${currentYear}-${currentMonth}-${day}`;
    setSelectedDate(date);
    onChange?.(date);
    setIsShow(false);
  };

  const handleDayClick = (day: number | null) => {
    if (day !== null) {
      selectDay(day);
    }
  };

  return (
    <div className="sw-date-picker">
      <div className="sw-date-picker__input" onClick={() => setIsShow(!isShow)}>
        <SInput value={value || selectedDate} placeholder={placeholder} readonly />
      </div>
      {isShow && (
        <div className="sw-date-picker__calendar sw-date-picker__calendar--show">
          <div className="sw-date-picker__header">
            <span className="sw-date-picker__title">{currentYear}年{currentMonth}月</span>
            <div className="sw-date-picker__nav">
              <button className="sw-date-picker__nav-btn" onClick={prevMonth}>‹</button>
              <button className="sw-date-picker__nav-btn" onClick={nextMonth}>›</button>
            </div>
          </div>
          <div className="sw-date-picker__week">
            {weekDays.map(day => (
              <span key={day} className="sw-date-picker__week-item">{day}</span>
            ))}
          </div>
          <div className="sw-date-picker__days">
            {calendarDays.map((day, index) => (
              day !== null ? (
                <div
                  key={index}
                  className="sw-date-picker__day"
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              ) : (
                <div key={index} className="sw-date-picker__day sw-date-picker__day--other" />
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SDatePicker;