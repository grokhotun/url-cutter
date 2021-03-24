import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useFetch} from '@/hooks/http.hook'
import {AuthContext} from '@/context/AuthContext'
import Loader from '@/components/Loader'
import LinksList from '@/components/LinksList'

const LinksPage = () => {
  const {isLoading, request} = useFetch()
  const [links, setLinks] = useState([])
  const {token} = useContext(AuthContext)

  const fetchLinks = useCallback(async () => {
    try {
      const data = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className="links-page">
      {!isLoading && <LinksList links={links}/>}
    </div>
  )
}

export default LinksPage
