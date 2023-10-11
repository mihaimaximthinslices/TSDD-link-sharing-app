import LogoDevlinksSmall from '../svg/logo-devlinks-small'
import IconLinksHeader from '../svg/icon-links-header'
import IconProfileDetailsHeader from '../svg/icon-profile-details-header'
import IconPreviewHeader from '../svg/icon-preview-header'

export default function DashboardNavbar() {
  return (
    <div className="w-full md:p-4">
      <div className="flex justify-between pt-4 pb-4 pl-6 pr-4 items-center bg-white md:rounded-xl">
        <div className="pr-[20px]">
          <LogoDevlinksSmall />
        </div>
        <div className="flex ">
          <div className="pl-[27px] pr-[27px] pt-[11px] pb-[11px] bg-purpleS rounded-xl">
            <IconLinksHeader />
          </div>

          <div className="pl-[27px] pr-[27px] pt-[11px] pb-[11px]">
            <IconProfileDetailsHeader />
          </div>
        </div>
        <div className="pt-[10px] pb-[10px] pl-[16px] pr-[16px] border-purpleH border rounded-xl">
          <IconPreviewHeader />
        </div>
      </div>
    </div>
  )
}
