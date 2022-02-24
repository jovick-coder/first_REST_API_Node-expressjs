const express = require('express')

const homePageRoute = express.Router()

homePageRoute.get('/', (req, res) => {
  res.send('hello world')
})

module.exports = homePageRoute
