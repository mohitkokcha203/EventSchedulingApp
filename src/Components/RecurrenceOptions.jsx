import React from 'react';
import './RecurrenceOptions.css'

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const RecurrenceOptions = ({ recurrence, onRecurrenceChange, taskDescription, onDescriptionChange }) => {
  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    // Handle changes for custom days checkboxes
    if (type === 'checkbox') {
      const newCustomDays = checked
        ? [...recurrence.customDays, value]
        : recurrence.customDays.filter((day) => day !== value);
      onRecurrenceChange({ ...recurrence, customDays: newCustomDays });
    } else if (name === 'taskDescription') {
      onDescriptionChange(value);
    } else {
      onRecurrenceChange({ ...recurrence, [name]: value });
    }
  };

  return (
    <div >
      <h2 className="recureence-h2">Recurrence Options</h2>
      <div className="recureence-main-div">
      <div className="">
        <label className="recureence-label">Frequency:</label>
        <select
          name="frequency"
          value={recurrence.frequency}
          onChange={handleInputChange}
          className="recureence-input"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {recurrence.frequency !== 'custom' && (
        <div className="">
          <label className="recureence-label">Interval:</label>
          <input
            type="number"
            name="interval"
            value={recurrence.interval}
            onChange={handleInputChange}
            className="recureence-input-interval"
            min="1"
          />
        </div>
      )}

      {recurrence.frequency === 'custom' && (
        <div className="">
          <h3 className="recureence-custom-h3">Select Days of the Week:</h3>
          <div className="">
            {DAYS_OF_WEEK.map((day) => (
              <label key={day} className="recureence-custom-day">
                <input
                  type="checkbox"
                  name="customDays"
                  value={day}
                  checked={recurrence.customDays.includes(day)}
                  onChange={handleInputChange}
                  className=""
                />
                {day}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Task Description Input */}
      <div className="">
        <label className="recureence-label">Task Description:</label>
        <input
          type="text"
          name="taskDescription"
          value={taskDescription}
          onChange={handleInputChange}
          className="recureence-input"
          placeholder="E.g., Morning Jog"
        />
      </div>
      </div>
    </div>
  );
};

export default RecurrenceOptions;
