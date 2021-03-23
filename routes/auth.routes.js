const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config  = require('config')

const router = Router()

const User = require('../models/User')

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный логин').isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов').isLength({min: 6})
  ],
  async (request, response) => {
  try {
    const error = validationResult(request)
    if (!error.isEmpty()) {
      return response
        .status(400)
        .json({
          error: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
    }
    const {email, password} = request.body
    const account = await User.findOne({email})
    if (account) {
      response
        .status(400)
        .json({message: 'Пользователь, с таким логином уже существует'})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({email, password: hashedPassword})
    await user.save()
    return response
      .status(201)
      .json({message: 'Пользователь создан'})

  } catch (error) {
    return response
      .status(500)
      .json({message: 'Что-то пошло не так, попробуйте еще раз'})
  }
  }
)

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (request, response) => {
    try {
      const error = validationResult(request)
      if (!error.isEmpty()) {
        return response
          .status(400)
          .json({
            error: errors.array(),
            message: 'Некорректные данные при входе в систему'
          })
      }
      const {email, password} = request.body
      const account = await User.findOne({email})

      if (!account) {
        return response
          .status(400)
          .json({
            message: 'Пользователь с таким email не существует'
          })
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password)

      if (!isPasswordMatched) {
        return response
          .status(400)
          .json({
            message: 'Неверный логин или пароль'
          })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecretKey'),
        {expiresIn: '1h'}
      )

      return response.json({token, userId: user.id})

    } catch (error) {
      return response
        .status(500)
        .json({message: 'Что-то пошло не так, попробуйте еще раз'})
    }
  }
)

module.exports = router