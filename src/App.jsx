
import React from 'react';
import Header from './components/Header';
import DatePicker from './components/DatePicker';
import RecurrenceOptions from './components/RecurrenceOptions';
import PreviewCalendar from './components/PreviewCalendar';
import useStore from './hooks/useStore';
import './index.css';
import './App.css'

function App() {
  
  const { startDate, endDate, setStartDate, setEndDate, recurrence, setRecurrence, taskDescription, setTaskDescription } = useStore();

  return (
    <div className="p-0 m-0 box-border w-100% flex ">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-lg  max-w-2xl mx-auto">
          <Header />

          
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          
          <RecurrenceOptions
            recurrence={recurrence}
            onRecurrenceChange={setRecurrence}
            taskDescription={taskDescription}
            onDescriptionChange={setTaskDescription}
          />

          
          <PreviewCalendar
            startDate={startDate}
            endDate={endDate}
            recurrence={recurrence}
            taskDescription={taskDescription}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
