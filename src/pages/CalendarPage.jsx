import { useState } from 'react';
import { Sidebar } from '../components/layout/SideBar';
import { Header } from '../components/layout/Header';
import { CalendarHeader } from '../components/calendar/CalendarHeader';
import { CalendarGrid } from '../components/calendar/CalendarGrid';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');

  const handleMonthChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <CalendarHeader
            currentDate={currentDate}
            onMonthChange={handleMonthChange}
            onViewChange={handleViewChange}
          />

          <div className="bg-white rounded-lg shadow p-4">
            <CalendarGrid currentDate={currentDate} />
          </div>
        </main>
      </div>
    </div>
  );
} 