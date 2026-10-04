import React from 'react';
import { Target, CheckCircle2, Circle, Clock, Award } from 'lucide-react';

const Dashboard = ({ subjects, assignments, streak }) => {
  const upcomingAssignments = assignments.filter(a => !a.completed).slice(0, 3);
  const completedToday = 3;
  const goalToday = 5;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="page-title">Welcome back, Scholar! 🚀</h1>
          <p className="page-subtitle">Here is what's happening with your studies today.</p>
        </div>
        <button className="btn btn-primary">
          <Target size={18} /> Set Daily Goal
        </button>
      </div>

      <div className="grid-3 mb-6">
        <div className="card glass">
          <div className="flex items-center justify-between mb-4">
            <div className="text-muted font-medium">Daily Goal Progress</div>
            <Target size={20} className="text-accent" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span style={{ fontSize: '36px', fontWeight: 'bold' }}>{completedToday}</span>
            <span className="text-muted">/ {goalToday} tasks</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${(completedToday / goalToday) * 100}%` }}></div>
          </div>
        </div>

        <div className="card glass">
          <div className="flex items-center justify-between mb-4">
            <div className="text-muted font-medium">Study Streak</div>
            <Award size={20} color="#f59e0b" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span style={{ fontSize: '36px', fontWeight: 'bold' }}>{streak}</span>
            <span className="text-muted">days fire! 🔥</span>
          </div>
          <p className="text-muted" style={{ fontSize: '13px' }}>You're in the top 10% of users this week.</p>
        </div>

        <div className="card glass" style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(167, 139, 250, 0.1))', borderColor: 'rgba(124, 58, 237, 0.3)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-muted font-medium" style={{ color: '#e2e8f0' }}>AI Study Tip</div>
            <span className="badge badge-purple">New</span>
          </div>
          <p style={{ fontSize: '15px', fontWeight: '500', lineHeight: '1.4' }}>
            "Reviewing your Computer Science notes within 24 hours of class increases retention by 60%."
          </p>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <h2 className="mb-4" style={{ fontSize: '20px' }}>Your Subjects</h2>
          <div className="flex-col gap-4">
            {subjects.map(subject => (
              <div key={subject.id} className="card" style={{ padding: '16px' }}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: subject.color }}></div>
                    <span style={{ fontWeight: '600', fontSize: '16px' }}>{subject.name}</span>
                  </div>
                  <span className="text-muted" style={{ fontSize: '14px' }}>{subject.progress}% Mastered</span>
                </div>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4" style={{ fontSize: '20px' }}>Upcoming Deadlines</h2>
          <div className="card">
            {upcomingAssignments.length > 0 ? (
              <div className="flex-col gap-4">
                {upcomingAssignments.map(assignment => {
                  const subject = subjects.find(s => s.id === assignment.subjectId);
                  return (
                    <div key={assignment.id} className="flex items-start gap-4 p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                      <button className="btn-icon" style={{ padding: '4px' }}>
                        <Circle size={20} />
                      </button>
                      <div className="flex-1">
                        <div style={{ fontWeight: '500' }}>{assignment.title}</div>
                        <div className="flex items-center gap-2 mt-1" style={{ fontSize: '12px' }}>
                          <span className="badge" style={{ backgroundColor: `${subject?.color}20`, color: subject?.color }}>
                            {subject?.name}
                          </span>
                          <span className="text-muted flex items-center gap-1">
                            <Clock size={12} /> {assignment.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-muted">
                <CheckCircle2 size={48} className="mx-auto mb-4 opacity-50" />
                <p>All caught up! Time to relax or study ahead.</p>
              </div>
            )}
            <button className="btn btn-secondary w-full mt-4">View All Tasks</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
