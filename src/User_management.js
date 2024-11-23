// src/ToDoList.js
import React, { useState } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const styles = {
    container: {
      textAlign: 'center',
      backgroundColor: '#f0f8ff', // Alice Blue background for a light, refreshing feel
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    },
    input: {
      padding: '10px',
      border: '2px solid #add8e6', // Light Blue border
      borderRadius: '5px',
      width: '70%',
      marginRight: '10px',
    },
    button: {
      padding: '10px',
      color: '#fff', // White text
      backgroundColor: '#ffa07a', // Light Salmon background
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#ff4500', // Orange Red for hover
    },
    ul: {
      listStyleType: 'none',
      padding: '0',
    },
    li: {
      padding: '10px',
      borderBottom: '1px solid #add8e6', // Light Blue border
      cursor: 'pointer',
    },
    liLastChild: {
      borderBottom: 'none',
    },
    liHover: {
      backgroundColor: '#e6e6fa', // Lavender background for hover
    },
    liCompleted: {
      textDecoration: 'line-through',
      color: '#6a5acd', // Slate Blue for completed tasks
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={{color: '#4682b4'}}>To-Do List</h1> {/* Steel Blue text */}
      <input 
        type="text" 
        value={taskInput} 
        onChange={(e) => setTaskInput(e.target.value)}
        style={styles.input}
      />
      <button 
        onClick={addTask} 
        style={styles.button}
        onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
      >
        Add Task
      </button>
      <ul style={styles.ul}>
        {tasks.map((task, index) => (
          <li 
            key={index} 
            onClick={() => toggleTaskCompletion(index)} 
            style={{
              ...styles.li, 
              ...(task.completed ? styles.liCompleted : {}),
              ...(index === tasks.length - 1 ? styles.liLastChild : {}),
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = styles.liHover.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
