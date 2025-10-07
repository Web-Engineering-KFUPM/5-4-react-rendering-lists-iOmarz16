import { useState } from "react";
import TaskItem from "./TaskItem";

export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  // ---------------------------
  // Toggle task completio
  function toggleTask(id) {
    onMutateCourse(index, tasks =>
      tasks.map(t => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );
  }

  // ---------------------------
  // Delete task
  function deleteTask(id) {
    onMutateCourse(index, tasks => tasks.filter(t => t.id !== id));
  }

  // ---------------------------
  // Add new task
  function addTask(e) {
    e.preventDefault();
    if (!title) return; 
    const newTask = {
      id: Date.now(),
      title,
      dueDate: date,
      isDone: false,
    };
    onMutateCourse(index, tasks => [...tasks, newTask]);
    setTitle("");
    setDate("");
  }

  // ---------------------------
  // Check if all tasks are done
  const allDone = course.tasks.length > 0 && course.tasks.every(t => t.isDone);

  return (
    <article className="course card">
      <header className="cardHeader">
        <h2>{course.title}</h2>
        {/* Badge: All caught up */}
        {allDone && <span className="badge">All caught up!</span>}
      </header>

      {/* ----------------------------
          Task List or Empty State
      ---------------------------- */}
      {course.tasks.length === 0 ? (
        <p>No tasks yet. Add your first one below.</p>
      ) : (
        <ul className="tasks">
          {course.tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}

      {/* ----------------------------
          Add Task Form
      ---------------------------- */}
      <form onSubmit={addTask} className="newTask">
        <input
          className="titleField"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label="Task title"
        />
        <div className="dateRow">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            aria-label="Due date"
          />
          <button type="submit" className="primary">Add</button>
        </div>
      </form>
    </article>
  );
}
