import { Token, Pair, ChainId } from '@kazamaswap/sdk'
import tokens from './tokens'
import { FarmAuctionBidderConfig } from './types'

const getLpAddress = (tokenAddress: string, quoteToken: Token) => {
  const token = new Token(ChainId.MAINNET, tokenAddress, 18)
  return Pair.getAddress(token, quoteToken)
}

export const whitelistedBidders: FarmAuctionBidderConfig[] = [
  {
    account: '0x29a3A5e7827f9d31241780236C36fd8775dC6d6D',
    farmName: 'KAZAMA-BNB',
    tokenAddress: '0x8b933d89170922e95a5F75b49d56e4ab385b8fD1',
    quoteToken: tokens.wbnb,
    tokenName: 'Kazama Senshi',
    projectSite: 'https://kazama.finance',
  },
  {
    account: '0xfac3542b823EcD2bdD9246dc155Ff96EdBc50D3c',
    farmName: 'INTERSTELLAR-BNB',
    tokenAddress: '0x42ea06125B2CDc1CBF480fed1E5e04958f822aC1',
    quoteToken: tokens.wbnb,
    tokenName: 'Interstellar',
    projectSite: 'https://youtu.be/ogd0ahj4cIE?t=90',
  },
].map((bidderConfig) => ({
  ...bidderConfig,
  lpAddress: getLpAddress(bidderConfig.tokenAddress, bidderConfig.quoteToken),
}))

const UNKNOWN_BIDDER: FarmAuctionBidderConfig = {
  account: '',
  tokenAddress: '',
  quoteToken: tokens.wbnb,
  farmName: 'Unknown',
  tokenName: 'Unknown',
}

export const getBidderInfo = (account: string): FarmAuctionBidderConfig => {
  const matchingBidder = whitelistedBidders.find((bidder) => bidder.account.toLowerCase() === account.toLowerCase())
  if (matchingBidder) {
    return matchingBidder
  }
  return { ...UNKNOWN_BIDDER, account }
}
