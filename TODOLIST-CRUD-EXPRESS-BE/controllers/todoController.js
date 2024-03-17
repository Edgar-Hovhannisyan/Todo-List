const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const getAllTodos =  (req, res) => {
  try {
    const data = fs.readFileSync("todos.json", 'utf-8');
    const jsonData = JSON.parse(data);
    res.json({ success: true, data: jsonData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, isDone } = req.body;
    if (title == null || isDone == null) {
      return res.status(400).json({ success: false, errorMessage: "Invalid data" });
    }

    const id = uuidv4();

    const newTodo = {
      id,
      title,
      isDone
    };

    let todos = [];
    try {
      const data = fs.readFileSync('todos.json', 'utf-8');
      todos = JSON.parse(data);
    } catch (err) {
      console.error('Error reading JSON file:', err);
    }

    todos.push(newTodo);

    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));

    res.status(201).json({ success: true, message: "TODO successfully added", todo: newTodo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { isDone, title } = req.body;
    const { id } = req.params;
    if (title == null || isDone == null) {
      return res.status(400).json({ success: false, errorMessage: "Invalid data" });
    }

    let todos = [];
    try {
      const data = fs.readFileSync('todos.json', 'utf-8');
      todos = JSON.parse(data);
    } catch (err) {
      console.error('Error reading JSON file:', err);
    }

    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ success: false, errorMessage: "Todo not found" });
    }

    todos[todoIndex].title = title;
    todos[todoIndex].isDone = isDone;

    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
    res.json({ success: true, message: "TODO updated successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
  
    let todos = [];
    try {
      const data = fs.readFileSync('todos.json', 'utf-8');
      todos = JSON.parse(data);
    } catch (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    const todoIndex = todos.findIndex(todo => todo.id === id);
  
    if (todoIndex === -1) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);

    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));

    res.json({ success: true, message: 'Todo successfully deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
