import LogoDevlinksSmall from '../svg/logo-devlinks-small'
import IconLinksHeader from '../svg/icon-links-header'
import IconProfileDetailsHeader from '../svg/icon-profile-details-header'
import IconPreviewHeader from '../svg/icon-preview-header'
import LogoDevlinksLarge from '../svg/logo-devlinks-large'

export default function DashboardNavbar() {
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
        <div data-cy="nav-customize-links-section-button" className="flex ">
          <div className="pl-[27px] pr-[27px] pt-[11px] pb-[11px] bg-purpleS rounded-xl flex gap-2 items-center">
            <IconLinksHeader />
            <p className="font-instrumentSans text-[16px] text-purpleH font-semibold hidden md:block">
              Links
            </p>
          </div>
          <div
            data-cy="nav-profile-section-button"
            className="pl-[27px] pr-[27px] pt-[11px] pb-[11px] flex gap-2 items-center"
          >
            <IconProfileDetailsHeader />
            <p className="font-instrumentSans text-[16px] text-blackM font-semibold hidden md:block">
              Profile Details
            </p>
          </div>
        </div>
        <div
          data-cy="nav-preview-section-button"
          className="pt-[10px] pb-[10px] pl-[16px] pr-[16px] border-purpleH border rounded-xl md:hidden"
        >
          <IconPreviewHeader />
        </div>
        <div
          data-cy="nav-preview-section-button"
          className="pt-[10px] pb-[10px] pl-[27px] pr-[27px] border-purpleH border rounded-xl flex justify-center hidden md:block"
        >
          <p className="text-purpleH">Preview</p>
        </div>
      </div>
    </div>
  )
}
