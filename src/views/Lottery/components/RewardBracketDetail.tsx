import React from 'react'
import BigNumber from 'bignumber.js'
import { Flex, Skeleton, Text } from '@kazamaswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { usePriceKazamaBusd } from 'state/farms/hooks'
import Balance from 'components/Balance'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'

interface RewardBracketDetailProps {
  kazamaAmount: BigNumber
  rewardBracket?: number
  numberWinners?: string
  isBurn?: boolean
  isHistoricRound?: boolean
  isLoading?: boolean
}

const RewardBracketDetail: React.FC<RewardBracketDetailProps> = ({
  rewardBracket,
  kazamaAmount,
  numberWinners,
  isHistoricRound,
  isBurn,
  isLoading,
}) => {
  const { t } = useTranslation()
  const kazamaPriceBusd = usePriceKazamaBusd()

  const getRewardText = () => {
    const numberMatch = rewardBracket + 1
    if (isBurn) {
      return t('Burn')
    }
    if (rewardBracket === 5) {
      return t('Match all %numberMatch%', { numberMatch })
    }
    return t('Match first %numberMatch%', { numberMatch })
  }

  return (
    <Flex flexDirection="column">
      {isLoading ? (
        <Skeleton mb="4px" mt="8px" height={16} width={80} />
      ) : (
        <Text bold color={isBurn ? 'failure' : 'primary'}>
          {getRewardText()}
        </Text>
      )}
      <>
        {isLoading || kazamaAmount.isNaN() ? (
          <Skeleton my="4px" mr="10px" height={20} width={110} />
        ) : (
          <Balance fontSize="20px" bold unit=" KAZAMA" value={getBalanceNumber(kazamaAmount)} decimals={0} />
        )}
        {isLoading || kazamaAmount.isNaN() ? (
          <>
            <Skeleton mt="4px" mb="16px" height={12} width={70} />
          </>
        ) : (
          <Balance
            fontSize="16px"
            color="textSubtle"
            prefix="~$"
            value={getBalanceNumber(kazamaAmount.times(kazamaPriceBusd))}
            decimals={5}
          />
        )}
        {isHistoricRound && kazamaAmount && (
          <>
            {numberWinners !== '0' && (
              <Text fontSize="12px" color="textSubtle">
                {getFullDisplayBalance(kazamaAmount.div(parseInt(numberWinners, 10)), 18, 2)} KAZAMA {t('each')}
              </Text>
            )}
            <Text fontSize="12px" color="textSubtle">
              {numberWinners} {t('Winners')}
            </Text>
          </>
        )}
      </>
    </Flex>
  )
}

export default RewardBracketDetail
