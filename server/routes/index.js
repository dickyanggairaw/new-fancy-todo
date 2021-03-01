const router = require('express').Router()
const TodoController = require('../controller/todoController')

router.get('/', (req, res) => {
    res.status(200).send('hello world')
})

router.post('/todos', TodoController.postTodo)
router.get('/todos', TodoController.readTodos)
router.get('/todos/:id', TodoController.readByIdTodo)
router.put('/todos/:id', TodoController.putTodo)
router.patch('/todos/:id', TodoController.patchTodo)
router.delete('/todos/:id', TodoController.deleteTodo)

module.exports = router