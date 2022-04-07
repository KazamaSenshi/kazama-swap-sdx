import React from 'react'
import { Flex, Text } from '@kazamaswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { usePriceKazamaBusd } from 'state/farms/hooks'
import { useKazamaVault } from 'state/pools/hooks'
import { getKazamaVaultEarnings } from 'views/Pools/helpers'
import RecentKazamaProfitBalance from './RecentKazamaProfitBalance'

const RecentKazamaProfitCountdownRow = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    pricePerFullShare,
    userData: { kazamaAtLastUserAction, userShares, lastUserActionTime },
  } = useKazamaVault()
  const kazamaPriceBusd = usePriceKazamaBusd()
  const { hasAutoEarnings, autoKazamaToDisplay, autoUsdToDisplay } = getKazamaVaultEarnings(
    account,
    kazamaAtLastUserAction,
    userShares,
    pricePerFullShare,
    kazamaPriceBusd.toNumber(),
  )

  const lastActionInMs = lastUserActionTime && parseInt(lastUserActionTime) * 1000
  const dateTimeLastAction = new Date(lastActionInMs)
  const dateStringToDisplay = dateTimeLastAction.toLocaleString()

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">{`${t('Recent KAZAMA profit')}:`}</Text>
      {hasAutoEarnings && (
        <RecentKazamaProfitBalance
          kazamaToDisplay={autoKazamaToDisplay}
          dollarValueToDisplay={autoUsdToDisplay}
          dateStringToDisplay={dateStringToDisplay}
        />
      )}
    </Flex>
  )
}

export default RecentKazamaProfitCountdownRow
