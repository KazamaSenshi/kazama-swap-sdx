import React from 'react'
import { TokenPairImage, ImageProps } from '@kazamaswap/uikit'
import { mainnetTokens } from 'config/constants/tokens'

const KazamaVaultTokenPairImage: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  const primaryTokenSrc = `/images/tokens/${mainnetTokens.kazama.address}.svg`

  return <TokenPairImage primarySrc={primaryTokenSrc} secondarySrc="/images/tokens/autorenew.svg" {...props} />
}

export default KazamaVaultTokenPairImage
