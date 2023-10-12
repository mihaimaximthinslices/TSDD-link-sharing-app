import IllustrationEmpty from '../svg/illustration-empty'
import IllustrationPhoneMockup from '../svg/illustration-phone-mockup'

export function LinkDrawer() {
  return (
    <div
      data-cy="nav-customize-links-profile-link-placeholder"
      className="z-10 w-[237px] h-[44px] rounded-md bg-grayH"
    ></div>
  )
}
export default function AddNewLinkSection() {
  return (
    <div className="flex-grow flex">
      <div className="w-full bg-whiteM flex gap-6 justify-center">
        <div className="w-[560px] hidden 1xl:block bg-white rounded-xl mt-2 mb-6 relative">
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transform: 'translate(-50%, -50%)',
              zIndex: 0,
            }}
          >
            <IllustrationPhoneMockup />
          </div>
          <div className="flex flex-col items-center justify-center pb-[90px] w-full h-full pt-[100px]">
            <div
              className="w-[96px] h-[96px] rounded-full z-10 bg-grayH"
              data-cy="nav-customize-links-profile-picture-placeholder"
            ></div>
            <div
              data-cy="nav-customize-links-profile-name-placeholder"
              className="z-10 w-[160px] h-[16px] rounded-xl mt-[26px] bg-grayH"
            ></div>
            <div
              data-cy="nav-customize-links-profile-email-placeholder"
              className="z-10 w-[72px] h-[8px] rounded-xl mt-[13px] bg-grayH"
            ></div>
            <div className="flex flex-col mt-[56px] gap-5">
              {[1, 2, 3, 4, 5].map((number) => {
                return <LinkDrawer key={number} />
              })}
            </div>
          </div>
        </div>
        <div className="grow max-w-[808px]">
          <div className="w-full h-full bg-whiteM flex flex-col grow">
            <div className="w-full h-full p-4 md:pb-6 md:pt-2 bg-whiteM flex flex-col grow 1xl:p-0 1xl:pb-6 1xl:pt-2">
              <div className="w-full h-full bg-white p-6 flex flex-col grow rounded-xl items-center md:p-10">
                <div className="flex flex-col gap-2 w-full">
                  <div className="w-full flex justify-start items-center">
                    <h1
                      data-cy="customize-links-section-title"
                      className="font-instrumentSans font-semibold text-[24px] text-blackH"
                    >
                      Customize your links
                    </h1>
                  </div>
                  <div className="w-full flex justify-start">
                    <p
                      data-cy="customize-links-section-info"
                      className="font-instrumentSans font-normal text-[16px] text-blackM"
                    >
                      Add/edit/remove links below and then share all your
                      profiles with the world!
                    </p>
                  </div>
                </div>
                <div className="flex w-full justify-center border border-purpleH rounded-md pt-[11px] pb-[11px] mt-10">
                  <button
                    data-cy="customize-links-section-add-link-button"
                    className="font-instrumentSans text-[16px] text-purpleH font-semibold"
                  >
                    + Add new link
                  </button>
                </div>

                <div className="w-full flex justify-center items-center p-5 grow bg-whiteM mt-6">
                  <div
                    data-cy="customize-links-section-get-started-ilustration"
                    className="flex flex-col gap-6 md:gap-0"
                  >
                    <div className="w-full flex justify-center">
                      <IllustrationEmpty />
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="w-full flex justify-center">
                        <p className="font-instrumentSans font-bold text-[24px] text-blackH">
                          Let's get you started
                        </p>
                      </div>
                      <div>
                        <p className="font-instrumentSans font-normal text-[16px] text-blackM text-center max-w-[488px]">
                          Use the “Add new link” button to get started. Once you
                          have more than one link, you can reorder and edit
                          them. We’re here to help you share your profiles with
                          everyone!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="w-full bg-blackS"
                style={{
                  height: '1px',
                }}
              ></div>
              <div className="w-full p-4 flex justify-center bg-white md:p-10 md:pt-6 md:pb-6 md:justify-end rounded-b-xl">
                <button
                  data-cy="customize-links-section-save-button"
                  className="font-instrumentSans text-[16px] font-semibold text-white bg-purpleM w-full pt-[11px] pb-[11px] rounded-md md:w-[91px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
