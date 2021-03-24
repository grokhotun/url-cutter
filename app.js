const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const PORT = config.get('port')
const MONGO_URI = config.get('mongoUri')

const app = express()
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/links.routes'))
app.use('/t', require('./routes/redirect.routes'))

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту: ${PORT}`)
    })
  } catch (error) {
    console.log(`Ошибка запуска сервера: ${error.message}`)
    process.exit(1)
  }
}

startServer()

process.on('SIGINT', () => {
  console.log( "\nОстанавливаем сервер из командной строки... (Ctrl-C)" )
  process.exit(1)
})
