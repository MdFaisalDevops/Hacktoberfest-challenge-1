import React, { useState } from 'react';
import { Plus, Book, Calendar as CalendarIcon, CheckCircle2, Circle, MoreVertical, Trash2 } from 'lucide-react';

const SubjectsManager = ({ subjects, setSubjects, assignments, setAssignments }) => {
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectColor, setNewSubjectColor] = useState('#7c3aed');
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [selectedSubjectForTask, setSelectedSubjectForTask] = useState(subjects[0]?.id || '');

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    const newSubject = {
      id: Date.now(),
      name: newSubjectName,
      color: newSubjectColor,
      progress: 0
    };
    setSubjects([...subjects, newSubject]);
    setNewSubjectName('');
    if (!selectedSubjectForTask) setSelectedSubjectForTask(newSubject.id);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !selectedSubjectForTask) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      subjectId: Number(selectedSubjectForTask),
      dueDate: newTaskDate || 'No date',
      completed: false
    };
    setAssignments([...assignments, newTask]);
    setNewTaskTitle('');
    setNewTaskDate('');
  };

  const toggleTask = (taskId) => {
    setAssignments(assignments.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setAssignments(assignments.filter(task => task.id !== taskId));
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Subjects & Tasks 📚</h1>
      <p className="page-subtitle">Manage your coursework, assignments, and exams.</p>

      <div className="grid-2">
        {/* Subjects Column */}
        <div className="flex-col gap-6">
          <div className="card glass">
            <h2 className="mb-4 text-xl flex items-center gap-2"><Book size={20} className="text-accent" /> Add New Subject</h2>
            <form onSubmit={handleAddSubject} className="flex-col gap-4">
              <div className="input-group mb-0">
                <label className="input-label">Subject Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Organic Chemistry"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                />
              </div>
              <div className="input-group mb-0">
                <label className="input-label">Color Theme</label>
                <div className="flex gap-2">
                  {['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'].map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewSubjectColor(color)}
                      className="btn-icon"
                      style={{ 
                        width: '32px', height: '32px', borderRadius: '50%', backgroundColor: color,
                        border: newSubjectColor === color ? '2px solid white' : '2px solid transparent',
                        boxShadow: newSubjectColor === color ? `0 0 0 2px ${color}` : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-full mt-2">
                <Plus size={18} /> Create Subject
              </button>
            </form>
          </div>

          <div className="flex-col gap-3">
            {subjects.map(subject => (
              <div key={subject.id} className="card p-4 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: subject.color }}></div>
                  <span style={{ fontWeight: '600', fontSize: '16px' }}>{subject.name}</span>
                </div>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="btn-icon"><MoreVertical size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Column */}
        <div className="flex-col gap-6">
          <div className="card glass">
            <h2 className="mb-4 text-xl flex items-center gap-2"><CalendarIcon size={20} className="text-accent" /> Add Task/Exam</h2>
            <form onSubmit={handleAddTask} className="flex-col gap-4">
              <div className="input-group mb-0">
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Task title (e.g. Midterm Prep)"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="input-group mb-0 flex-1">
                  <select 
                    className="input-field" 
                    value={selectedSubjectForTask}
                    onChange={(e) => setSelectedSubjectForTask(e.target.value)}
                  >
                    {subjects.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-0 flex-1">
                  <input 
                    type="date" 
                    className="input-field" 
                    value={newTaskDate}
                    onChange={(e) => setNewTaskDate(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-full mt-2">
                <Plus size={18} /> Add Task
              </button>
            </form>
          </div>

          <div className="card">
            <h2 className="mb-4 text-xl">All Tasks</h2>
            <div className="flex-col gap-2">
              {assignments.map(task => {
                const subject = subjects.find(s => s.id === task.subjectId);
                return (
                  <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors" style={{ background: task.completed ? 'var(--bg-tertiary)' : 'transparent', opacity: task.completed ? 0.7 : 1 }}>
                    <button className="btn-icon" style={{ padding: '4px', color: task.completed ? 'var(--success)' : 'var(--text-secondary)' }} onClick={() => toggleTask(task.id)}>
                      {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </button>
                    <div className="flex-1">
                      <div style={{ fontWeight: '500', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</div>
                      <div className="flex items-center gap-2 mt-1" style={{ fontSize: '12px' }}>
                        <span style={{ color: subject?.color }}>{subject?.name}</span>
                        <span className="text-muted">• {task.dueDate}</span>
                      </div>
                    </div>
                    <button className="btn-icon text-muted hover:text-danger" onClick={() => deleteTask(task.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
              {assignments.length === 0 && (
                <div className="text-center py-4 text-muted">No tasks added yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectsManager;
