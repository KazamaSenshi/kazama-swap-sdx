import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'KazamaSwap',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('KazamaSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('KazamaSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('KazamaSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('KazamaSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('KazamaSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('KazamaSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('KazamaSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('KazamaSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('KazamaSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('KazamaSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('KazamaSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('KazamaSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('KazamaSwap')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('KazamaSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('KazamaSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('KazamaSwap')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('KazamaSwap')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('KazamaSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('KazamaSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('KazamaSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('KazamaSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('PancakeSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('PancakeSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Pools')} | ${t('PancakeSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    default:
      return null
  }
}
