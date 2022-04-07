import React from 'react'
import styled from 'styled-components'
import { Box } from '@kazamaswap/uikit'
import Container from '../Layout/Container'

const Outer = styled(Box)<{ background?: string }>`
background: url(images/kazamastaking.svg) no-repeat center center; 
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
`

const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 80px;
`

const KazamaStakingHeader: React.FC<{ background?: string }> = ({ background, children, ...props }) => (
  <Outer background={background} {...props}>
    <Inner>{children}</Inner>
  </Outer>
)

export default KazamaStakingHeader
