var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todoController');
/* GET home page. */
// POST create a todo
router.post('/todo', todoController.createTodo);
router.get('/todo', todoController.getAllTodos);
router.patch('/todo/:id', todoController.updateTodo);
router.delete('/todo/:id', todoController.deleteTodo);
module.exports = router;
