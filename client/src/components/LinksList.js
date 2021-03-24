/* eslint react/prop-types: 0 */
import React from 'react'
import {Link} from 'react-router-dom'

const LinksList = ({links}) => {
  if (!links.length) {
    return <p className="text-center">Пока нет ни одной ссылки</p>
  }
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Оригинальная</th>
          <th scope="col">Сокращенная</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {
          links && links.map((link, idx) => {
            return (
              <tr key={link._id}>
                <th scope="row">{idx + 1}</th>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <td>
                  <Link to={`/detail/${link._id}`}>Подробнее</Link>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default LinksList
