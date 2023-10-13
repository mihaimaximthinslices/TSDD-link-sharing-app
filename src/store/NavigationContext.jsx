import React, { createContext, useState } from 'react'

export const dashboardSections = {
  customizeLinks: 'customize-links',
  updateProfileDetails: 'update-profile-details',
}
export const NavigationContext = createContext({
  dashboardSection: dashboardSections.customizeLinks,
})

export const NavigationProvider = ({ children }) => {
  const [navigation, setNavigation] = useState({
    dashboardSection: dashboardSections.customizeLinks,
  })

  return (
    <NavigationContext.Provider value={{ navigation, setNavigation }}>
      {children}
    </NavigationContext.Provider>
  )
}
