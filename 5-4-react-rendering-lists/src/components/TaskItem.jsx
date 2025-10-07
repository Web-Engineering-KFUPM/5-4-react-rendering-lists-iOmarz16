import DueBadge from "./DueBadge";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task" key={task.id}>
      {/* Checkbox + Task Title */}
      <label className="taskMain">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.isDone ? "done" : ""}>{task.title}</span>
      </label>

      {/* DueBadge only if task is not done and has a due date */}
      {!task.isDone && task.dueDate && <DueBadge dueDate={task.dueDate} />}

      {/* Delete button */}
      <button
        className="ghost"
        aria-label="Delete task"
        onClick={() => onDelete(task.id)}
      >
        ✕
      </button>
    </li>
  );
}
