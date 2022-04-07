import { useCallback } from 'react'
import { ethers, Contract } from 'ethers'
import { useSenshiMaster } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useApproveFarm = (lpContract: Contract) => {
  const SenshiMasterContract = useSenshiMaster()
  const { callWithGasPrice } = useCallWithGasPrice()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await callWithGasPrice(lpContract, 'approve', [
        SenshiMasterContract.address,
        ethers.constants.MaxUint256,
      ])
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [lpContract, SenshiMasterContract, callWithGasPrice])

  return { onApprove: handleApprove }
}

export default useApproveFarm
