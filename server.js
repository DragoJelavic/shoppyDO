const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const routes = require('./routes/routes')
require('dotenv')
  .config()

const app = express()

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connected'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'views')))

app.set('views', path.join(__dirname, 'views'))
app.use('/assets', express.static('assets'))
app.set('view engine', 'ejs')

app.use('/', routes)

const port = process.env.PORT || 5000

app.listen(3000, () => {
  console.log(`listening on port ${port}`)
})
