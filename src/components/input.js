import React from 'react'
import { Input } from 'antd'
import classNames from 'classnames'
import styled from 'styled-components'

const StyledInput = styled(Input)`
  /* stylelint-disable */
`

export default ({ field, form, modern, simple, className, ...props }) => (
  <StyledInput
    {...field}
    {...props}
    className={classNames(className, { modern, simple })}
  />
)
