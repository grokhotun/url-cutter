import React, {useContext, useState} from 'react'
import {useFetch} from '@/hooks/http.hook'
import {AuthContext} from '@/context/AuthContext'
import {useHistory} from 'react-router-dom'

const CreatePage = () => {
  const history = useHistory()
  const {token} = useContext(AuthContext)
  const {request} = useFetch()
  const [link, setLink] = useState('')

  const changeHandler = (e) => {
    console.log(e.target.value)
    setLink(e.target.value)
  }

  const clickHandler = async () => {
    try {
      const data = await request('/api/link/generate', 'POST', {from: link}, {
        Authorization: `Bearer ${token}`
      })
      console.log('response', data)
      history.push(`/detail/${data.link._id}`)
    } catch (error) {
      console.log(error)
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
      <button onClick={clickHandler} className="btn btn-primary">Сократить!</button>
    </div>
  )
}

export default CreatePage
