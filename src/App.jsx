import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [milestones, setMilestones] = useState([]);
  const [milestone, setMilestone] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("high");
  const [sortOption, setSortOption] = useState("none");

  const addMilestone = () => {
    if (milestone.trim() && date.trim()) {
      const priorityValue =
        priority === "high" ? 1 : priority === "medium" ? 2 : 3;
      const newMilestone = {
        milestone,
        date,
        priority: priorityValue,
        completed: false,
      };
      setMilestones([...milestones, newMilestone]);
      setMilestone("");
      setDate("");
      setPriority("high");
    }
  };

  const removeMilestone = (index) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  const toggleComplete = (index) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index].completed = !updatedMilestones[index].completed;
    setMilestones(updatedMilestones);
  };

  const sortMilestones = () => {
    let sortedMilestones = [...milestones];
    switch (sortOption) {
      case "az":
        sortedMilestones.sort((a, b) => a.milestone.localeCompare(b.milestone));
        break;
      case "za":
        sortedMilestones.sort((a, b) => b.milestone.localeCompare(a.milestone));
        break;
      case "dateAsc":
        sortedMilestones.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "dateDesc":
        sortedMilestones.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "priority":
        sortedMilestones.sort((a, b) => a.priority - b.priority);
        break;
      case "completed":
        sortedMilestones.sort((a, b) =>
          a.completed === b.completed ? 0 : a.completed ? -1 : 1
        );
        break;
      default:
        break;
    }
    setMilestones(sortedMilestones);
  };

  return (
    <div className="app">
      <h1>Project Timeline Tracker</h1>
      <div className="input-fields">
        <input
          type="text"
          value={milestone}
          onChange={(e) => setMilestone(e.target.value)}
          placeholder="Enter milestone"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <button onClick={addMilestone}>Add Milestone</button>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="none">Sort By</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="dateAsc">Date (Asc)</option>
          <option value="dateDesc">Date (Desc)</option>
          <option value="priority">Priority</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={sortMilestones}>Sort</button>
      </div>
      <div className="timeline">
        {milestones.map((m, index) => (
          <div
            key={index}
            className={`milestone ${m.completed ? "completed" : ""}`}
          >
            <label>
              <input
                type="checkbox"
                checked={m.completed}
                onChange={() => toggleComplete(index)}
              />
              {m.milestone}
            </label>
            <span>{m.date}</span>
            <span>
              Priority:{" "}
              {m.priority === 1 ? "High" : m.priority === 2 ? "Medium" : "Low"}
            </span>
            <button onClick={() => removeMilestone(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
