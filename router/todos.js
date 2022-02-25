const express = require('express')
const { default: mongoose } = require('mongoose')

const todoRoute = express.Router()

const Todos = mongoose.model(
  'Todo',
  new mongoose.Schema({
    todo: { type: String, require: true },
    done: { type: Boolean, require: true },
    date: { type: Date, default: Date.now, require: true },
  }),
)
// Get all todos
todoRoute.get('/', (req, res) => {
  Todos.find()
    .then((todos) => {
      res.send(todos)
    })
    .catch((err) => console.error(err))
})

// // Get A todo
// no need to call a single todo in out application
// todoRoute.get('/:id', (req, res) => {
//   const todoId = req.params.id

//   const todo = todosData.find((todo) => todo.id === parseInt(todoId))

//   if (!todo)
//     return res.status(404).send(`Todo with the ID '${todoId}' was not found`)

//   res.send(todo)
// })

// delete a todo
todoRoute.delete('/:id', (req, res) => {
  const todoId = req.params.id
  Todos.findByIdAndDelete(todoId).then(() => {
    res.send('Data Deleted')
  })
})

// add a todo
todoRoute.post('/', (req, res) => {
  const { todo, done } = req.body

  if (!req.body) return res.status(400).send('ivalide input')

  new Todos({ todo: todo, done: done }).save()
})

// update todo
todoRoute.put('/:id', (req, res) => {
  const todoId = req.params.id

  updateTodo = req.body
  Todos.findByIdAndUpdate(todoId, {
    $set: updateTodo,
  }).then((newTodo) => {
    res.send(newTodo)
  })
})

module.exports = todoRoute
