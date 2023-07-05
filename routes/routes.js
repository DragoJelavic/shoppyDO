const router = require('express')
  .Router()
const Todo = require('../models/todo')

router.get('/', (req, res) => {
  Todo.find({})
    .then((results) => {
      res.render('index', { todos: results })
    })
    .catch((error) => {
      res.status(500)
        .send('An error occurred: ' + error.message)
    })
})

router.post('/todos', (req, res) => {
  const newTodo = new Todo({ description: req.body.description })

  newTodo.save()
    .then(() => {
      res.redirect('/')
    })
    .catch((error) => {
      res.status(500)
        .send('An error occurred: ' + error.message)
    })
})

router.post('/todos/:id/completed', (req, res) => {
  const todoId = req.params.id
  Todo.findById(todoId)
    .exec()
    .then((todo) => {
      if (!todo) {
        throw new Error('Todo not found')
      }

      todo.done = !todo.done
      return todo.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch((error) => {
      res.status(500)
        .send('An error occurred: ' + error.message)
    })
})

router.put('/todos/:id', (req, res) => {
  const todoId = req.params.id
  const update = { description: req.body.description }

  Todo.findByIdAndUpdate(todoId, update, { new: true })
    .then((todo) => {
      if (!todo) {
        throw new Error('Todo not found')
      }

      res.redirect('/')
    })
    .catch((error) => {
      res.status(500)
        .send('An error occurred: ' + error.message)
    })
})

router.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id

  Todo.findByIdAndRemove(todoId)
    .then((todo) => {
      if (!todo) {
        throw new Error('Todo not found')
      }

      res.redirect('/')
    })
    .catch((error) => {
      res.status(500)
        .send('An error occurred: ' + error.message)
    })
})

module.exports = router
