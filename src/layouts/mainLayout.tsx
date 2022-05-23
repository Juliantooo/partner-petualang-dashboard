import React from 'react'
import type { ReactElement } from 'react'
import { Navigation } from '../components'
import useLayout from '../libs/router/useLayout'
import { useRouter } from 'next/router'

interface ILayoutChildren {
  children: ReactElement
}

const MainLayout: React.FC<ILayoutChildren> = ({ children }) => {

  const { asPath } = useRouter()
  const isUseLayout = useLayout({ path: asPath })

  if (isUseLayout) {
    return (
      <>
        <Navigation>
          {children}
        </Navigation>
      </>
    )
  } else {
    return (
      <>
        {children}
      </>
    )
  }
}

export default MainLayout