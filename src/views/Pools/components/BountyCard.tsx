import React, { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Text,
  Flex,
  HelpIcon,
  Button,
  Heading,
  Skeleton,
  useModal,
  Box,
  useTooltip,
} from '@kazamaswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceKazamaBusd } from 'state/farms/hooks'
import { useKazamaVault } from 'state/pools/hooks'
import Balance from 'components/Balance'
import BountyModal from './BountyModal'

const StyledCard = styled(Card)`
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`

export const KazamaHeaderText = styled.div`
   font-family: 'Luckiest Guy', cursive;
   font-style: regular;
   font-size: 64px;
   -webkit-text-fill-color: white;
   -webkit-text-stroke-color: black;
   -webkit-text-stroke-width: 3.00px; 
   font-weight: 400;
   margin-bottom: 48px;
`

export const KazamaText = styled.div`
   font-family: 'Luckiest Guy', cursive;
   font-style: regular;
   font-size: 28px;
   -webkit-text-fill-color: white;
   -webkit-text-stroke-color: black;
   -webkit-text-stroke-width: 2.00px; 
   font-weight: 400;
`

export const KazamaTextButton = styled.div`
   font-family: 'Luckiest Guy', cursive;
   font-style: regular;
   font-size: 18px;
   -webkit-text-fill-color: white;
   -webkit-text-stroke-color: black;
   -webkit-text-stroke-width: 1.00px; 
   font-weight: 400;
`

const BountyCard = () => {
  const { t } = useTranslation()
  const {
    estimatedKazamaBountyReward,
    fees: { callFee },
  } = useKazamaVault()
  const kazamaPriceBusd = usePriceKazamaBusd()

  const estimatedDollarBountyReward = useMemo(() => {
    return new BigNumber(estimatedKazamaBountyReward).multipliedBy(kazamaPriceBusd)
  }, [kazamaPriceBusd, estimatedKazamaBountyReward])

  const hasFetchedDollarBounty = estimatedDollarBountyReward.gte(0)
  const hasFetchedKazamaBounty = estimatedKazamaBountyReward ? estimatedKazamaBountyReward.gte(0) : false
  const dollarBountyToDisplay = hasFetchedDollarBounty ? getBalanceNumber(estimatedDollarBountyReward, 18) : 0
  const kazamaBountyToDisplay = hasFetchedKazamaBounty ? getBalanceNumber(estimatedKazamaBountyReward, 18) : 0

  const TooltipComponent = ({ fee }: { fee: number }) => (
    <>
      <Text mb="16px">{t('This bounty is given as a reward for providing a service to other users.')}</Text>
      <Text mb="16px">
        {t(
          'Whenever you successfully claim the bounty, you’re also helping out by activating the Auto KAZAMA Pool’s compounding function for everyone.',
        )}
      </Text>
      <Text style={{ fontWeight: 'bold' }}>
        {t('Auto-Compound Bounty: %fee%% of all Auto KAZAMA pool users pending yield', { fee: fee / 100 })}
      </Text>
    </>
  )

  const [onPresentBountyModal] = useModal(<BountyModal TooltipComponent={TooltipComponent} />)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent fee={callFee} />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  return (
    <>
      {tooltipVisible && tooltip}
      <StyledCard>
        <CardBody>
          <Flex flexDirection="column">
            <Flex alignItems="center" mb="12px">
              <Text fontSize="16px" bold color="textSubtle" mr="4px">
                {t('Auto Compound Bounty')}
              </Text>
              <Box ref={targetRef}>
                <HelpIcon color="textSubtle" />
              </Box>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column" mr="12px">
              <Heading>
                {hasFetchedKazamaBounty ? (
                  <Balance fontSize="20px" bold value={kazamaBountyToDisplay} decimals={2} unit=" KAZAMA" /> 
                ) : (
                  <Skeleton height={20} width={96} mb="2px" />
                )}
              </Heading>
              {hasFetchedDollarBounty ? (
                <Balance
                  fontSize="12px"
                  color="textSubtle"
                  value={dollarBountyToDisplay}
                  decimals={2}
                  unit=" USD"
                  prefix="~"
                />
              ) : (
                <Skeleton height={16} width={62} />
              )}
            </Flex>
            <Button
              color="success"
              disabled={!kazamaBountyToDisplay || !callFee}
              onClick={onPresentBountyModal}
              scale="sm"
              id="clickClaimVaultBounty"
            >
              <KazamaTextButton>
              {t('Claim bounty!')}
              </KazamaTextButton>
            </Button>
          </Flex>
        </CardBody>
      </StyledCard>
    </>
  )
}

export default BountyCard
