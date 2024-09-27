
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useStore from '../hooks/useStore';
import './Datepicker.css'

const DatePicker = ({ onStartDateChange, onEndDateChange }) => {
  const { startDate, endDate, recurrence, taskDescription } = useStore();
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const calculateRecurringDates = () => {
    const dates = [];
    let current = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(startDate).setFullYear(current.getFullYear() + 1);

    if (recurrence.frequency === 'custom') {
      while (current <= end) {
        if (recurrence.customDays.includes(current.toLocaleString('en-US', { weekday: 'long' }))) {
          dates.push(new Date(current));
        }
        current.setDate(current.getDate() + 1); // Increment day-by-day
      }
    } else {
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
  };

  const recurringDates = calculateRecurringDates();

  return (
    <div>
    <h2 className="date-h2">Select Dates</h2>
    <div className="main-div">
      
      
      {/* Start Date Input and Calendar */}
      <div className="start-date-div">
        <label className="date-label">Start Date:</label>
        <input
          type="date"
          value={startDate.toISOString().substring(0, 10)}
          onChange={(e) => onStartDateChange(new Date(e.target.value))}
          className="date-input"
        />
        
        
      </div>

      {/* End Date Input and Calendar */}
      <div className="start-date-div">
        <label className="date-label">End Date:</label>
        <input
          type="date"
          value={endDate ? endDate.toISOString().substring(0, 10) : ''}
          onChange={(e) => onEndDateChange(new Date(e.target.value))}
          className="date-input"
        />
        
        
      </div>

      
    </div>
    </div>
  );
};

export default DatePicker;
