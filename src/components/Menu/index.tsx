import React from 'react'
import { Menu as UikitMenu } from '@kazamaswap/uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { usePriceKazamaBusd } from 'state/farms/hooks'
import { useProfile } from 'state/profile/hooks'
import config from './config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const kazamaPriceUsd = usePriceKazamaBusd()
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()

  return (
    <UikitMenu
      userMenu={<UserMenu />}
      globalMenu={<GlobalSettings />}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      kazamaPriceUsd={kazamaPriceUsd.toNumber()}
      links={config(t)}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu
