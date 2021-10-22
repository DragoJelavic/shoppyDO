const express = require('express')
const mongoose = require('mongoose')
const mustacheExpress = require('mustache-express')
const path = require('path')
const routes = require('./routes/routes')
require('dotenv').config()

const app = express()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.klup6.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true }).then(() => {
  console.log('db up and running')
}).catch((err) => {
  console.log('ups, error!!!')
  console.log(err)
})

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'views')))

const mustacheExpressInstance = mustacheExpress()
mustacheExpressInstance.cache = null

app.engine('mustache', mustacheExpressInstance)
app.set('view engine', 'mustache')

app.use('/', routes)

app.listen(3000, () => {
  console.log('listening on port 3000')
})
