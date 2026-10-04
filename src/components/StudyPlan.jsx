import React, { useState } from 'react';
import { Sparkles, RefreshCcw, Brain, ArrowRight, ArrowLeft } from 'lucide-react';

const StudyPlan = ({ subjects }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [planReady, setPlanReady] = useState(false);
  const [activeView, setActiveView] = useState('schedule'); // 'schedule', 'flashcards'
  
  // Flashcards state
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const mockPlan = [
    { day: 'Today', tasks: ['Review Physics chapter 4 (45m)', 'Practice Calculus derivatives (30m)'] },
    { day: 'Tomorrow', tasks: ['Computer Science mock test (1h)', 'Read upcoming Math lecture notes (20m)'] },
    { day: 'Wednesday', tasks: ['Physics lab report draft (1h)'] }
  ];

  const flashcards = [
    { q: 'What is the time complexity of binary search?', a: 'O(log n)' },
    { q: 'What is the derivative of e^x?', a: 'e^x' },
    { q: 'Newton\'s First Law of Motion?', a: 'An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.' }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setPlanReady(true);
    }, 1500);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="page-title flex items-center gap-3">
            AI Study Partner <Sparkles size={28} className="text-accent" />
          </h1>
          <p className="page-subtitle">Personalized study schedules and active recall tools.</p>
        </div>
        {planReady && (
          <div className="flex gap-2 p-1 bg-[var(--bg-tertiary)] rounded-lg">
            <button 
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${activeView === 'schedule' ? 'bg-[var(--bg-secondary)] shadow-sm' : 'text-muted'}`}
              onClick={() => setActiveView('schedule')}
            >
              Schedule
            </button>
            <button 
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${activeView === 'flashcards' ? 'bg-[var(--bg-secondary)] shadow-sm' : 'text-muted'}`}
              onClick={() => setActiveView('flashcards')}
            >
              Flashcards
            </button>
          </div>
        )}
      </div>

      {!planReady ? (
        <div className="card glass text-center py-16 px-4">
          <Brain size={64} className="mx-auto mb-6 text-accent" opacity={0.8} />
          <h2 className="text-2xl font-bold mb-4">Generate your optimal study plan</h2>
          <p className="text-muted max-w-md mx-auto mb-8">
            Our AI analyzes your subjects, upcoming tasks, and past performance to create the perfect study schedule and custom flashcards.
          </p>
          <button 
            className="btn btn-primary btn-lg" 
            style={{ padding: '14px 28px', fontSize: '16px' }}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <><RefreshCcw size={20} className="animate-spin" /> Analyzing Data...</>
            ) : (
              <><Sparkles size={20} /> Generate Plan & Materials</>
            )}
          </button>
        </div>
      ) : activeView === 'schedule' ? (
        <div className="grid-2">
          <div className="flex-col gap-4">
            <h2 className="text-xl font-bold mb-2">Suggested Schedule</h2>
            {mockPlan.map((day, idx) => (
              <div key={idx} className="card relative overflow-hidden" style={{ borderColor: idx === 0 ? 'var(--accent-primary)' : '' }}>
                {idx === 0 && (
                  <div className="absolute top-0 right-0 bg-accent text-white px-3 py-1 text-xs font-bold rounded-bl-lg" style={{ backgroundColor: 'var(--accent-primary)' }}>
                    High Priority
                  </div>
                )}
                <h3 className="font-bold mb-3">{day.day}</h3>
                <ul className="flex-col gap-2">
                  {day.tasks.map((task, tidx) => (
                    <li key={tidx} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5" style={{ backgroundColor: 'var(--accent-secondary)' }}></div>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <div className="card glass bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)]">
              <h3 className="font-bold mb-4 text-lg">Why this plan?</h3>
              <p className="text-muted text-sm mb-4 leading-relaxed">
                You have a Computer Science mock test tomorrow, so we prioritized reviewing recent concepts today. Physics is scheduled for short bursts to maintain retention based on your past performance.
              </p>
              <button className="btn btn-secondary w-full" onClick={() => setActiveView('flashcards')}>
                <Brain size={16} /> Practice Flashcards
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted font-medium">Card {currentCard + 1} of {flashcards.length}</span>
            <span className="badge badge-purple">Mixed Subjects</span>
          </div>
          
          <div className="flashcard-container mb-8" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
              <div className="flashcard-front">
                <span className="text-muted text-sm uppercase tracking-wider mb-6">Question</span>
                <h3 className="text-2xl font-bold">{flashcards[currentCard].q}</h3>
                <p className="text-muted text-sm mt-8 opacity-60">Click to reveal answer</p>
              </div>
              <div className="flashcard-back">
                <span className="text-white text-sm uppercase tracking-wider mb-6 opacity-80">Answer</span>
                <p className="text-xl font-medium leading-relaxed max-w-md">{flashcards[currentCard].a}</p>
                <div className="flex gap-4 mt-8">
                  <button className="badge bg-white text-black bg-opacity-20 hover:bg-opacity-30 border-none px-4 py-2" onClick={(e) => { e.stopPropagation(); nextCard(); }}>Got it</button>
                  <button className="badge bg-black bg-opacity-30 text-white hover:bg-opacity-40 border-none px-4 py-2" onClick={(e) => { e.stopPropagation(); nextCard(); }}>Need review</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button className="btn btn-secondary" onClick={prevCard}>
              <ArrowLeft size={18} /> Previous
            </button>
            <button className="btn btn-secondary" onClick={nextCard}>
              Next <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlan;
