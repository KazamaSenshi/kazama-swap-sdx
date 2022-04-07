import React from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Heading, Text, Flex, Link, Breadcrumbs } from '@kazamaswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import PageHeader from 'components/PageHeader'
import PageSection from 'components/PageSection'
import useTheme from 'hooks/useTheme'
import AuctionDetails from './components/AuctionDetailsCard'
import AuctionLeaderboard from './components/AuctionLeaderboard'
import { FORM_ADDRESS } from './helpers'
import { useCurrentFarmAuction } from './hooks/useCurrentFarmAuction'
import AuctionTimer from './components/AuctionTimer'
import ReclaimBidCard from './components/ReclaimBidCard'
import CongratulationsCard from './components/CongratulationsCard'

const StyledHeader = styled(PageHeader)`
  max-height: max-content;
  margin-bottom: -40px;
  padding-bottom: 40px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.md} {
    max-height: 600px;
  }
`

const Left = styled(Flex)`
  flex-direction: column;
  flex: 1;
`

const Right = styled(Flex)`
  align-items: center;
  justify-content: center;
  flex: 0.5;
  & img {
    height: 50%;
    width: 50%;
    max-height: 330px;
    margin-top: 5px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & img {
      height: auto;
      width: auto;
    }
  }
`

const AuctionContainer = styled(Flex)`
  width: 100%;
  align-items: flex-start;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 24px;
  }
`

const FarmAuction = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { account } = useWeb3React()

  const { currentAuction, bidders, connectedBidder, refreshBidders } = useCurrentFarmAuction(account)

  return (
    <>
      <PageHeader>
        <Flex flexDirection={['column-reverse', null, 'row']}>
          <Left>
            <Heading as="h2" scale="xl" my="10px" color="white">
              {t('Kazama Farm Auctions!')}
            </Heading>
            <Heading scale="md" color="primary">
              {t('Basho no tame ni tatakau!')}
            </Heading>
            <Text color="#797c91">
              {t(
                'Fight for a spot in the Kazama auctions to win a temporary farm with a 1x multiplier!',
              )}
            </Text>
            <Text color="#797c91">
              {t(
                'Only projects that are whitelisted can bid, if you are not, you can follow the auction.',
              )}
            </Text>
            <Text color="#797c91" mb="24px">
              {t(
                'If you are interested in participating in the auction, please fill out the apply form.',
              )}
            </Text>
            <Link external href={FORM_ADDRESS}>
              <Button>
                <Text color="white" bold fontSize="16px" mr="4px">
                  {t('Apply for a Farm/Pool')}
                </Text>
              </Button>
            </Link>
          </Left>
          <Right>
            <img src="/images/decorations/AuctionSenshis.png" alt={t('Senshi of the auctions!')} />
          </Right>
        </Flex>
      </PageHeader>
      <>
        <PageSection
          innerProps={{ style: { margin: '0', width: '100%' } }}
          background={theme.colors.background}
          p="24px 0"
          index={2}
          concaveDivider
          dividerPosition="top"
        >

          <AuctionTimer auction={currentAuction} />
          <AuctionContainer flexDirection={['column', null, null, 'row']}>
            <Flex flex="1" flexDirection="column" width="100%" minWidth="288px">
              <AuctionDetails
                auction={currentAuction}
                connectedBidder={connectedBidder}
                refreshBidders={refreshBidders}
              />
              {connectedBidder?.isWhitelisted && bidders && currentAuction && (
                <CongratulationsCard currentAuction={currentAuction} bidders={bidders} />
              )}
              {connectedBidder?.isWhitelisted && <ReclaimBidCard />}
            </Flex>
            <AuctionLeaderboard auction={currentAuction} bidders={bidders} />
          </AuctionContainer>
        </PageSection>
      </>
    </>
  )
}

export default FarmAuction
