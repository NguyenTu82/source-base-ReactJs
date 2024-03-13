import React from 'react'
import { Input } from 'antd'
import classNames from 'classnames'
import styled from 'styled-components'

const StyledInput = styled(Input.Password)`
  /* stylelint-disable */
`

export default ({ field, form, modern, simple, className, onPaste, ...props }) => (
  <StyledInput
    {...field}
    {...props}
    onPaste={onPaste}
    className={classNames(className, { modern, simple })}
  />
)
