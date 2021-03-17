const router = require('express').Router()
const UserController = require('../controller/userController')
const TodoController = require('../controller/todoController')
const {authentication, authorization} = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.status(200).send('hello world')
})

router.post('/goauth', UserController.googleOauth)
router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)

router.use(authentication)
router.post('/todos', TodoController.postTodo)
router.get('/todos', TodoController.readTodos)

router.get('/todos/:id', authorization, TodoController.readByIdTodo)
router.put('/todos/:id', authorization, TodoController.putTodo)
router.patch('/todos/:id', authorization, TodoController.patchTodo)
router.delete('/todos/:id', authorization, TodoController.deleteTodo)



module.exports = router