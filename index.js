const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let taskExists = tasks.some(task => task.taskId === taskId);
  if (!taskExists) {
    let newTask = { taskId: taskId, text: text, priority: priority };
    tasks.push(newTask);
  }

  res.json(tasks);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/sort-by-priority', (req, res) => {
  let sortedTasks = tasks.sort((a, b) => a.priority - b.priority);
  res.json(tasks);
});

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  tasks.forEach((task) => {
    if (task.taskId === taskId) {
      task.priority = priority;
    }
  });
  res.json(tasks);
});

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  tasks.forEach((task) => {
    if (task.taskId === taskId) {
      task.text = text;
    }
  });
  res.json(tasks);
});

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  tasks = tasks.filter((task) => task.taskId != taskId);
  res.json(tasks);
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let filteredTasks = tasks.filter((task) => task.priority == priority);
  res.json(filteredTasks);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
