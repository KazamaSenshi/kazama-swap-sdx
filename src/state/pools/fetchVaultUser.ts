import BigNumber from 'bignumber.js'
import { getKazamaVaultContract } from 'utils/contractHelpers'

const kazamaVaultContract = getKazamaVaultContract()

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await kazamaVaultContract.userInfo(account)
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares.toString()).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime.toString(),
      lastUserActionTime: userContractResponse.lastUserActionTime.toString(),
      kazamaAtLastUserAction: new BigNumber(userContractResponse.kazamaAtLastUserAction.toString()).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      kazamaAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
