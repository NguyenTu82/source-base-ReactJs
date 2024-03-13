import React from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  /* stylelint-disable */
`

export default ({ children, ...props }) => (
  <StyledModal
    centered
    footer={null}
    {...props}
  >
    {children}
  </StyledModal>
)
