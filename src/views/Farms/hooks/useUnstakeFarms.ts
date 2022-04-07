import { useCallback } from 'react'
import { unstakeFarm } from 'utils/calls'
import { useSenshiMaster } from 'hooks/useContract'

const useUnstakeFarms = (pid: number) => {
  const SenshiMasterContract = useSenshiMaster()

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstakeFarm(SenshiMasterContract, pid, amount)
    },
    [SenshiMasterContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeFarms
