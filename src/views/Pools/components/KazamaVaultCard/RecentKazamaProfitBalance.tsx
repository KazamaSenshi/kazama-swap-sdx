import React from 'react'
import { Text, TooltipText, useTooltip } from '@kazamaswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'

interface RecentKazamaProfitBalanceProps {
  kazamaToDisplay: number
  dollarValueToDisplay: number
  dateStringToDisplay: string
}

const RecentKazamaProfitBalance: React.FC<RecentKazamaProfitBalanceProps> = ({
  kazamaToDisplay,
  dollarValueToDisplay,
  dateStringToDisplay,
}) => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Balance fontSize="16px" value={kazamaToDisplay} decimals={3} bold unit=" KAZAMA" />
      <Balance fontSize="16px" value={dollarValueToDisplay} decimals={2} bold prefix="~$" />
      {t('Earned since your last action')}
      <Text>{dateStringToDisplay}</Text>
    </>,
    {
      placement: 'bottom-end',
    },
  )

  return (
    <>
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} small>
        <Balance fontSize="14px" value={kazamaToDisplay} />
      </TooltipText>
    </>
  )
}

export default RecentKazamaProfitBalance
