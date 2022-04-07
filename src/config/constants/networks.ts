import { ChainId } from '@kazamaswap/sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: 'https://rpc.swapdex.network',
  [ChainId.TESTNET]: 'https://rpc.kusari.network',
}

export default NETWORK_URLS
