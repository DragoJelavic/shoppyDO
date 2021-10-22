const router = require('express').Router()
const Todo = require('../models/todo')

router.get('/', (req, res) => {
  Todo.find({}).then((results) => {
    res.render('index', { todos: results })
  })
})

router.post('/todos', (req, res) => {
  const newTodo = new Todo({ description: req.body.description })

  newTodo.save().then((result) =>
    res.redirect('/')
  ).catch(() => {
    res.redirect('/')
  })
})

router.post('/todos/:id/completed', (req, res) => {
  const todoId = req.params.id
  Todo.findById(todoId).exec().then((results) => {
    results.done = !results.done

    return results.save()
  }).then(() => res.redirect('/'))
})

module.exports = router
