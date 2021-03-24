import React, {useContext, useState} from 'react'
import {useFetch} from '@/hooks/http.hook'
import {AuthContext} from '@/context/AuthContext'
import {useHistory} from 'react-router-dom'

const CreatePage = () => {
  const history = useHistory()
  const {token} = useContext(AuthContext)
  const {request} = useFetch()
  const [link, setLink] = useState('')
  const [isError, setIsError] = useState(false)

  const changeHandler = (e) => setLink(e.target.value)

  const clickHandler = async () => {
    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    const regex = new RegExp(expression)
    if (!link.match(regex)) {
      setIsError(true)
    } else {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${token}`
        })
        history.push(`/detail/${data.link._id}`)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="create-page">
      <div className="mb-3">
        <label htmlFor="link" className="form-label">Ваша ссылка</label>
        <input
          value={link}
          onChange={changeHandler}
          className="form-control"
          name="link"
          type="text"
          id="link"/>
      </div>
      {isError && <p className="text-danger">Ссылка некорректна! (Пример: http://yandex.ru, https://yandex.ru)</p>}
      <button onClick={clickHandler} className="btn btn-primary">Сократить!</button>
    </div>
  )
}

export default CreatePage
