import { ChainId } from '@kazamaswap/sdk'
import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getSenshiMasterAddress = () => {
  return getAddress(addresses.SenshiMaster)
}
export const getKazamaVaultAddress = () => {
  return getAddress(addresses.kazamaVault)
}
export const getKazamaLotteryAddress = () => {
  return getAddress(addresses.kazamaLottery)
}
export const getWBNBAddress = () => {
  return getAddress(addresses.WrappedBNB)
}
export const getKazamaBNBLotteryAddress = () => {
  return getAddress(addresses.kazamaBNBLottery)
}
export const getKazamaFarmAuctionAddress = () => {
  return getAddress(addresses.KazamaFarmAuction)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getTradingCompetitionAddress = () => {
  return getAddress(addresses.tradingCompetition)
}
export const getPredictionsAddress = () => {
  return getAddress(addresses.predictions)
}
export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}

