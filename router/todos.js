const express = require('express')
const { default: mongoose } = require('mongoose')

const todoRoute = express.Router()

const todosData = []

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
      // if (todos.length === 0) return res.status(404).send('No Todos Now')
      res.send(todos)
    })
    .catch((err) => console.error(err))
})

// Get A todo
todoRoute.get('/:id', (req, res) => {
  const todoId = req.params.id

  const todo = todosData.find((todo) => todo.id === parseInt(todoId))

  if (!todo)
    return res.status(404).send(`Todo with the ID '${todoId}' was not found`)

  res.send(todo)
})

// delete a todo
todoRoute.delete('/:id', (req, res) => {
  const todoId = req.params.id
  const todo = todosData.find((todo) => todo.id === parseInt(todoId))

  if (!todo)
    return res.status(404).send(`Todo with the ID '${todoId}' was not found`)

  const todoIndex = todosData.indexOf(todo)

  const deletedTodo = todosData.splice(todoIndex, 1)
  res.send(deletedTodo)
})

// add a todo
todoRoute.post('/', (req, res) => {
  const todo = req.body.todo

  if (!todo) return res.status(400).send('ivalide input')

  const newTodo = {
    id: todosData.length + 1,
    todo: todo,
    done: false,
  }

  todosData.push(newTodo)
  res.send(newTodo)
})

// update todo

todoRoute.put('/:id', (req, res) => {
  const todoId = parseInt(req.params.id)
  const todo = todosData.find((todo) => todo.id === todoId)

  if (!todo) return res.status(404).send(`No todo with the ID ${todoId} `)
  // if (!req.body.done)
  //   return res.status(400).send('no todo found in your request body')
  // todo.todo = req.body.todo
  todo.done = req.body.done

  res.send(todo)
  // console.log(req.body.done)
})

module.exports = todoRoute
