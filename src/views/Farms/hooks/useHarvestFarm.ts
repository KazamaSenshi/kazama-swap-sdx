import { useCallback } from 'react'
import { harvestFarm } from 'utils/calls'
import { useSenshiMaster } from 'hooks/useContract'

const useHarvestFarm = (farmPid: number) => {
  const SenshiMasterContract = useSenshiMaster()

  const handleHarvest = useCallback(async () => {
    await harvestFarm(SenshiMasterContract, farmPid)
  }, [farmPid, SenshiMasterContract])

  return { onReward: handleHarvest }
}

export default useHarvestFarm
