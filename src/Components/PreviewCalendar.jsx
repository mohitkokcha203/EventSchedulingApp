
import React, { useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../index.css'
import './PreviewCalendar.css'


const PreviewCalendar = ({ startDate, endDate, recurrence, taskDescription }) => {
  const recurringDates = useMemo(() => {
    const dates = [];
    let current = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(startDate).setFullYear(current.getFullYear() + 1);

    if (recurrence.frequency === 'custom') {
      // Custom frequency: Add only the days of the week selected
      while (current <= end) {
        if (recurrence.customDays.includes(current.toLocaleString('en-US', { weekday: 'long' }))) {
          dates.push(new Date(current));
        }
        current.setDate(current.getDate() + 1); // Increment day-by-day
      }
    } else {
      // Standard recurrence frequency logic
      while (current <= end) {
        dates.push(new Date(current));
        switch (recurrence.frequency) {
          case 'daily':
            current.setDate(current.getDate() + parseInt(recurrence.interval));
            break;
          case 'weekly':
            current.setDate(current.getDate() + parseInt(recurrence.interval) * 7);
            break;
          case 'monthly':
            current.setMonth(current.getMonth() + parseInt(recurrence.interval));
            break;
          case 'yearly':
            current.setFullYear(current.getFullYear() + parseInt(recurrence.interval));
            break;
          default:
            break;
        }
      }
    }
    return dates;
  }, [startDate, endDate, recurrence]);

  return (
    <div className="">
      <h2 className="calender-heading">Recurring Dates Preview:</h2>
      <div className='calender'>
      <Calendar 
        tileContent={({ date }) =>
          recurringDates.some((d) => d.toDateString() === date.toDateString()) ? (
            <div className="">
              <span className="tooltip">
                {taskDescription && taskDescription.trim() !== '' ? taskDescription : ''}
              </span>
            </div>
          ) : null
        }
      />
      </div>
    </div>
  );
};

export default PreviewCalendar;
