const todos = require('./router/todos')
const homePageRoute = require('./router/homePage')
const express = require('express')

const app = express()

app.use(express.json())
app.use('/', homePageRoute)
app.use('/api/todos', todos)

app.listen(3000, () => {
  console.log('Listening to port 3000...')
})
