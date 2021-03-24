const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (request, response, next) => {
  if (request.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = request.headers.authorization.split(' ')[1]
    if (!token) {
      return response
        .status(401)
        .json({message: 'Пользователь не авторизован'})
    }

    const decoded = jwt.verify(token, config.get('jwtSecretKey'))
    request.user = decoded
    next()
  } catch (error) {
    return response
        .status(401)
        .json({message: 'Пользователь не авторизован'})
  }
}