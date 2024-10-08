import { useState } from 'react';

const useCalendar = (waterData) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const dateKey = `${day.toString().padStart(2, '0')}.${(month + 1).toString().padStart(2, '0')}.${year}`;
      const dayData = waterData?.sortedResult?.find(record => {
        return record.localDate === dateKey;
      });
      return { day, data: dayData };
    });

    return daysArray;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };
  // console.log(currentDate)
  return {
    currentDate,
    setCurrentDate,
    renderDays,
    handlePrevMonth,
    handleNextMonth,
  };
};

export default useCalendar;
