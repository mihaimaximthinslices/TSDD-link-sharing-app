import LogoDevlinksSmall from '../svg/logo-devlinks-small'
import IconLinksHeader from '../svg/icon-links-header'
import IconProfileDetailsHeader from '../svg/icon-profile-details-header'
import IconPreviewHeader from '../svg/icon-preview-header'
import LogoDevlinksLarge from '../svg/logo-devlinks-large'
import { useContext } from 'react'
import { NavigationContext } from '../store/NavigationContext'
import { dashboardSections } from '../store/NavigationContext'
import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function DashboardNavbar() {
  const { setNavigation, navigation } = useContext(NavigationContext)

  const dashboardSection = navigation.dashboardSection

  const showCustomizeLinksSection =
    dashboardSection === dashboardSections.customizeLinks

  const showProfileDetailsSection =
    dashboardSection === dashboardSections.updateProfileDetails

  const { id } = useSelector((state) => state.profile)

  const navigate = useNavigate()

  return (
    <div className="w-full md:p-4 sticky top-0 z-50">
      <div
        data-cy="devlinks-logo"
        className="flex justify-between pt-4 pb-4 pl-6 pr-4 items-center bg-white md:rounded-xl"
      >
        <div className="pr-[20px] md:hidden">
          <LogoDevlinksSmall />
        </div>
        <div className="pr-[20px] hidden md:block">
          <LogoDevlinksLarge />
        </div>
        <div className="flex gap-4">
          <div
            data-cy="nav-customize-links-section-button"
            onClick={() => {
              setNavigation((old) => {
                return {
                  ...old,
                  dashboardSection: dashboardSections.customizeLinks,
                }
              })
            }}
            className={clsx(
              'pl-[27px] pr-[27px] pt-[11px] pb-[11px] rounded-xl flex gap-2 items-center cursor-pointer hoveredSection',
              showCustomizeLinksSection && 'selectedCustomizeLinksSection',
            )}
          >
            <IconLinksHeader />
            <p className="font-instrumentSans text-[16px] text-blackM font-semibold hidden md:block">
              Links
            </p>
          </div>
          <div
            data-cy="nav-profile-section-button"
            onClick={() => {
              setNavigation((old) => {
                return {
                  ...old,
                  dashboardSection: dashboardSections.updateProfileDetails,
                }
              })
            }}
            className={clsx(
              'pl-[27px] pr-[27px] pt-[11px] pb-[11px] flex gap-2 items-center cursor-pointer rounded-xl hoveredSection',
              showProfileDetailsSection && 'selectedCustomizeLinksSection',
            )}
          >
            <IconProfileDetailsHeader />
            <p className="font-instrumentSans text-[16px] text-blackM font-semibold hidden md:block">
              Profile Details
            </p>
          </div>
        </div>
        <div
          data-cy="nav-preview-section-button"
          className="pt-[10px] pb-[10px] pl-[16px] pr-[16px] border-purpleH border rounded-xl md:hidden hover:bg-purpleS cursor-pointer"
        >
          <IconPreviewHeader />
        </div>
        <div
          onClick={() => {
            navigate(`/profile/${id}`, { replace: false })
          }}
          data-cy="nav-preview-section-button"
          className="pt-[10px] pb-[10px] pl-[27px] pr-[27px] border-purpleH border rounded-xl flex justify-center hidden md:block hover:bg-purpleS cursor-pointer"
        >
          <p className="text-purpleH">Preview</p>
        </div>
      </div>
    </div>
  )
}
