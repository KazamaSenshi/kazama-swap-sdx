import { useCallback } from 'react'
import { stakeFarm } from 'utils/calls'
import { useSenshiMaster } from 'hooks/useContract'

const useStakeFarms = (pid: number) => {
  const SenshiMasterContract = useSenshiMaster()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeFarm(SenshiMasterContract, pid, amount)
      console.info(txHash)
    },
    [SenshiMasterContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeFarms
