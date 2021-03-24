/* eslint react/prop-types: 0 */
import React from 'react'

const LinkCard = ({link}) => {
  console.log(link)
  return (
    <div>
      <h1>Ссылка</h1>
      <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noreferrer">{link.to}</a></p>
      <p>Откуда: <a href={link.from} target="_blank" rel="noreferrer">{link.from}</a></p>
      <p>Количество кликов: <span>{link.clicks}</span></p>
    </div>
  )
}

export default LinkCard
