import { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

const pools: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: serializedTokens.kazama,
    earningToken: serializedTokens.kazama,
    contractAddress: {
      71: '0x4C8eBcC28E61B8B48E7A194fCC569C1724ED8340',
      70: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '75',
    sortOrder: 1,
    isFinished: false,
  },
]

export default pools
