import React from 'react'
import styled from 'styled-components'
import { Box } from '@kazamaswap/uikit'
import Container from '../Layout/Container'

const Outer = styled(Box)<{ background?: string }>`
background: url(images/kazamafarms.svg) no-repeat center center; 
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
`

const Inner = styled(Container)`
  padding-top: 42px;
  padding-bottom: 42px;
  margin-bottom: 0px;
`

const KazamaFarmHeader: React.FC<{ background?: string }> = ({ background, children, ...props }) => (
  <Outer background={background} {...props}>
    <Inner>{children}</Inner>
  </Outer>
)

export default KazamaFarmHeader
