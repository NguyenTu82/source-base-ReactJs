import React, {useState} from 'react'
import {useTranslation} from "react-i18next";

import LocalStorage from '../../utils/storage'
import Request from '../../utils/request'

import MenuIcon from '../../resources/icons/menu.svg'
import MenuColor from '../../resources/icons-color/menu.svg'

import {LogoutOutlined} from '@ant-design/icons'

import './style.scss'

function Header() {
  const {t} = useTranslation()

  const [indexHover, setHover] = useState(false)

  const toggleSideBar = () => {
    const element = document.getElementById('application')
    element.classList.toggle('open')
  }

  const handleLogout = () => {
    LocalStorage.clear()
    Request.removeAccessToken()
    window.location.pathname = '/login'
  }

  return (
    <div className="box-header" id="header">
      <div className="box-left">
        <div
          className="img-menu"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          onClick={() => toggleSideBar()}
        >
          <img src={indexHover ? MenuColor : MenuIcon} alt="" />
        </div>
      </div>

      <div className="box-right">
        <span className="logout" onClick={handleLogout}>{t('logout')} <LogoutOutlined /></span>
      </div>
    </div>
  )
}

export default Header
