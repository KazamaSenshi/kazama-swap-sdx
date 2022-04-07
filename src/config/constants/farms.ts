import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'KAZAMA',
    lpAddresses: {
      71: '0xDaEFAEd52a71Da17F641D062e26565Af0F802cac',
      70: '0xDaEFAEd52a71Da17F641D062e26565Af0F802cac',
    },
    token: serializedTokens.senshi,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'KAZAM-SDX LP',
    lpAddresses: {
      71: '0xCFF33A122812a6A61c2EF5272c890Ea22E5108E8',
      70: '0xCFF33A122812a6A61c2EF5272c890Ea22E5108E8',
    },
    token: serializedTokens.kazama,
    quoteToken: serializedTokens.wbnb,
  },
]

export default farms
