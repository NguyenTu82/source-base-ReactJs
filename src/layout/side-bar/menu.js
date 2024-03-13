import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import Overview from '../../resources/icons/overview.svg'

import OverviewColor from '../../resources/icons-color/overview.svg'

import classNames from 'classnames'

function SideBarComponent() {
  const [indexHover, setHover] = useState(null)
  const { t } = useTranslation()

  const menu = [
    {
      icon: Overview,
      iconColor: OverviewColor,
      title: t('overview'),
      link: '/'
    }
  ]

  const listMenu = menu.map((item, index) => {
    const isActive = item.link === window.location.pathname
    return <Link to={item.link} key={index}>
      <div
        onMouseOver={() => setHover(index)}
        onMouseOut={() => setHover(null)}
        className={classNames('menu-item', {active: isActive})}
      >
        <img src={(indexHover === index || !!isActive) ? item.iconColor : item.icon} alt="" />
        <span className="title">{item.title}</span>
      </div>
    </Link>
  })
  return (
    <div className="menu">
      {listMenu}
    </div>
  )
}

export default SideBarComponent
