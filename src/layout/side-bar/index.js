import React from 'react'
import Menu from './menu'
import {useTranslation} from "react-i18next";

import './style.scss'

function SideBar() {
  const {t} = useTranslation()
  return (
    <div className="box-side-bar" id="sidebar_main">
      <div className="header-side-bar">
        {t('welcome')}
      </div>
      <div className="body">
        <Menu />
      </div>
    </div>
  )
}

export default SideBar
