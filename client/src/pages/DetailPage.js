import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useFetch} from '@/hooks/http.hook'
import {AuthContext} from '@/context/AuthContext'
import Loader from '@/components/Loader'
import LinkCard from '@/components/LinkCard'

const DetailPage = () => {
  // eslint-disable-next-line
  const [link, setLink] = useState('')
  const {token} = useContext(AuthContext)
  const {request, isLoading} = useFetch()
  const {id} = useParams()

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/link/${id}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(data)
    } catch (error) {
      console.log(error)
    }
  }, [token, id, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className="detail-page">
      { !isLoading && link && <LinkCard link={link}/> }
    </div>
  )
}

export default DetailPage
