import BigNumber from 'bignumber.js'
import { convertSharesToKazama } from 'views/Pools/helpers'
import { multicallv2 } from 'utils/multicall'
import kazamaVaultAbi from 'config/abi/kazamaVault.json'
import { getKazamaVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'

export const fetchPublicVaultData = async () => {
  try {
    const calls = [
      'getPricePerFullShare',
      'totalShares',
      'calculateHarvestKazamaRewards',
      'calculateTotalPendingKazamaRewards',
    ].map((method) => ({
      address: getKazamaVaultAddress(),
      name: method,
    }))

    const [[sharePrice], [shares], [estimatedKazamaBountyReward], [totalPendingKazamaHarvest]] = await multicallv2(
      kazamaVaultAbi,
      calls,
    )

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    const totalKazamaInVaultEstimate = convertSharesToKazama(totalSharesAsBigNumber, sharePriceAsBigNumber)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalKazamaInVault: totalKazamaInVaultEstimate.kazamaAsBigNumber.toJSON(),
      estimatedKazamaBountyReward: new BigNumber(estimatedKazamaBountyReward.toString()).toJSON(),
      totalPendingKazamaHarvest: new BigNumber(totalPendingKazamaHarvest.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalKazamaInVault: null,
      estimatedKazamaBountyReward: null,
      totalPendingKazamaHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  try {
    const calls = ['performanceFee', 'callFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: getKazamaVaultAddress(),
      name: method,
    }))

    const [[performanceFee], [callFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicallv2(kazamaVaultAbi, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      callFee: callFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }
  } catch (error) {
    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
