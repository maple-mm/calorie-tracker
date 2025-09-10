import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import CalendarPage from './components/CalendarPage';
import GraphPage from './components/GraphPage';
import HowToUseModal from './components/HowToUseModal';
import QuestionMarkIcon from './components/QuestionMarkIcon';
import RecordPage from './components/RecordPage';

const App: React.FC = () => {
  const [isHowToUseModalOpen, setIsHowToUseModalOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-yellow-50 font-sans">
      <header className="relative bg-orange-400 p-4 text-center text-white shadow-md">
        <h1 className="text-xl font-bold">カロリー記録</h1>
        <button
          onClick={() => setIsHowToUseModalOpen(true)}
          aria-label="使い方"
          className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full p-1 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <QuestionMarkIcon className="h-6 w-6 text-white" />
        </button>
      </header>
      <main className="flex-grow pb-20">
        <Routes>
          <Route path="/" element={<Navigate to="/record" replace />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/record/:date" element={<RecordPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </main>
      <BottomNav />
      <HowToUseModal
        isOpen={isHowToUseModalOpen}
        onClose={() => setIsHowToUseModalOpen(false)}
      />
    </div>
  );
};

export default App;
