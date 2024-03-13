import React from 'react'
import { Pagination } from 'antd'
import classNames from 'classnames'
import 'antd/es/pagination/style/css'

import './style.scss'

export default ({ className, total, defaultCurrent, ...props }) => (
  <Pagination
    {...props}
    total={total}
    defaultCurrent={defaultCurrent}
    className={classNames(className, 'pagination-define')}
  />
)
