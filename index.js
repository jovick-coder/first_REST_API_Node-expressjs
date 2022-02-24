const todos = require('./router/todos')
const homePageRoute = require('./router/homePage')
const express = require('express')
const { default: mongoose } = require('mongoose')

mongoose
  .connect('mongodb://localhost/todo-list-app')
  .then(() => {
    console.log('connected to mongoDb...')
    app.listen(3000, () => {
      console.log('Listening to port 3000...')
    })
  })
  .catch((err) => console.log('Error->', err))
const app = express()

app.use(express.json())
app.use('/', homePageRoute)
app.use('/api/todos', todos)
