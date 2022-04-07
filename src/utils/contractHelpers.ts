import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import tokens from 'config/constants/tokens'

// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getKazamaLotteryAddress,
  getKazamaBNBLotteryAddress,
  getSenshiMasterAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddress,
  getKazamaVaultAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
  getMulticallAddress,
  getKazamaFarmAuctionAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import kazamaAbi from 'config/abi/kazama.json'
import WrappedBNBAbi from 'config/abi/WrappedBNB.json'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import kazamaLotteryAbi from 'config/abi/kazamaLottery.json'
import kazamaBNBLotteryAbi from 'config/abi/KazamaLotteryBNB.json'
import SenshiMasterAbi from 'config/abi/SenshiMaster.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefV2 from 'config/abi/sousChefV2.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import tradingCompetitionAbi from 'config/abi/tradingCompetition.json'
import kazamaVaultAbi from 'config/abi/kazamaVault.json'
import predictionsAbi from 'config/abi/predictions.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import KazamaFarmAuctionAbi from 'config/abi/KazamaFarmAuction.json'
import { ChainLinkOracleContract, KazamaFarmAuctionContract, PancakeProfileContract, PredictionsContract } from './types'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}
export const getErc721Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc721Abi, address, signer)
}
export const getLpContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lpTokenAbi, address, signer)
}
export const getIfoV1Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ifoV1Abi, address, signer)
}
export const getIfoV2Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ifoV2Abi, address, signer)
}
export const getSouschefContract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), signer)
}
export const getSouschefV2Contract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChefV2, getAddress(config.contractAddress), signer)
}
export const getPointCenterIfoContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), signer)
}
export const getKazamaContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(kazamaAbi, tokens.kazama.address, signer)
}
export const getWBNBContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(WrappedBNBAbi, tokens.wbnb.address, signer)
}
export const getProfileContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(profileABI, getPancakeProfileAddress(), signer) as PancakeProfileContract
}
export const getKazamaLotteryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(kazamaLotteryAbi, getKazamaLotteryAddress(), signer)
}
export const getKazamaBNBLotteryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(kazamaBNBLotteryAbi, getKazamaBNBLotteryAddress(), signer)
}
export const getSenshiMasterContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(SenshiMasterAbi, getSenshiMasterAddress(), signer)
}
export const getClaimRefundContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), signer)
}
export const getTradingCompetitionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(tradingCompetitionAbi, getTradingCompetitionAddress(), signer)
}
export const getKazamaVaultContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(kazamaVaultAbi, getKazamaVaultAddress(), signer)
}
export const getPredictionsContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(predictionsAbi, getPredictionsAddress(), signer) as PredictionsContract
}
export const getChainlinkOracleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), signer) as ChainLinkOracleContract
}
export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}
export const getKazamaFarmAuctionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(KazamaFarmAuctionAbi, getKazamaFarmAuctionAddress(), signer) as KazamaFarmAuctionContract
}
