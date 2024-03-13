import React from 'react'

import './style.scss'

function WrapperLayout({ children }) {
  return (
    <div className="box-wrapper" id="wrapper">
      {children}
    </div>
  )
}

export default WrapperLayout
