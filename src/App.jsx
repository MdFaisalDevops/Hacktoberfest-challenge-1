import { useState } from 'react'
import { BookOpen, LayoutDashboard, Timer, BrainCircuit, Share2, TrendingUp, Calendar as CalendarIcon, CheckCircle, BookOpenCheck } from 'lucide-react'
import Dashboard from './components/Dashboard'
import SubjectsManager from './components/SubjectsManager'
import Pomodoro from './components/Pomodoro'
import StudyPlan from './components/StudyPlan'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Advanced Mathematics', color: '#7c3aed', progress: 65 },
    { id: 2, name: 'Computer Science 101', color: '#10b981', progress: 82 },
    { id: 3, name: 'Physics Mechanics', color: '#f59e0b', progress: 40 },
  ]);
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Calculus Assignment 4', subjectId: 1, dueDate: '2026-10-10', completed: false },
    { id: 2, title: 'Final Project Setup', subjectId: 2, dueDate: '2026-10-06', completed: true },
  ]);
  const [streak, setStreak] = useState(12);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard subjects={subjects} assignments={assignments} streak={streak} />;
      case 'subjects':
        return <SubjectsManager subjects={subjects} setSubjects={setSubjects} assignments={assignments} setAssignments={setAssignments} />;
      case 'pomodoro':
        return <Pomodoro streak={streak} setStreak={setStreak} />;
      case 'plan':
        return <StudyPlan subjects={subjects} />;
      default:
        return <Dashboard subjects={subjects} assignments={assignments} streak={streak} />;
    }
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <BookOpenCheck size={28} color="#a78bfa" />
          <span>StudySprint</span>
        </div>
        
        <nav className="flex-col gap-2">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveTab('subjects')}
          >
            <BookOpen size={20} />
            Subjects & Tasks
          </button>
          <button 
            className={`nav-item ${activeTab === 'pomodoro' ? 'active' : ''}`}
            onClick={() => setActiveTab('pomodoro')}
          >
            <Timer size={20} />
            Pomodoro
          </button>
          <button 
            className={`nav-item ${activeTab === 'plan' ? 'active' : ''}`}
            onClick={() => setActiveTab('plan')}
          >
            <BrainCircuit size={20} />
            AI Study Plan
          </button>
        </nav>

        <div className="mt-auto">
          <div className="card" style={{ padding: '16px', background: 'rgba(124, 58, 237, 0.1)', borderColor: 'rgba(124, 58, 237, 0.2)' }}>
            <div className="flex items-center gap-4 mb-2">
              <TrendingUp size={24} color="#f59e0b" />
              <div>
                <div className="text-muted" style={{ fontSize: '12px' }}>Current Streak</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{streak} Days</div>
              </div>
            </div>
            <div className="progress-container mt-2">
              <div className="progress-bar" style={{ width: '100%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}></div>
            </div>
          </div>

          <button className="btn btn-secondary w-full mt-4" onClick={() => alert('Share link copied to clipboard!')}>
            <Share2 size={18} />
            Share Profile
          </button>
        </div>
      </aside>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
