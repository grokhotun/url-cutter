const {Router} = require('express')
const config = require('config')
const shortId = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (request, response) => {
  try {
    const {userId} = request.user
    const baseUrl = config.get('baseUrl')
    const {from}  = request.body
    const code = shortId.generate()
    const existing = await Link.findOne({from})
    if (existing) {
      return response.json({link: existing})
    }
    const to = `${baseUrl}/t/${code}`
    const link = new Link({
      code, to, from, owner: userId
    })
    await link.save()
    return response.status(201).json({link})
  } catch (error) {
    return response
      .status(500)
      .json({message: 'Внутренняя ошибка сервера, попробуйте позже'})
  }
})

router.get('/', auth, async (request, response) => {
  try {
    const {userId} = request.user
    const links = await Link.find({owner: userId})
    response.json(links)
  } catch (error) {
    return response
      .status(500)
      .json({message: 'Внутренняя ошибка сервера, попробуйте позже'})
  }
})

router.get('/:id', auth, async (request, response) => {
  try {
    const {id} = request.params
    const link = await Link.findById(id)
    console.log(link)
    response.json(link)
  } catch (error) {
    return response
      .status(500)
      .json({message: 'Внутренняя ошибка сервера, попробуйте позже'})
  }
})

module.exports = router