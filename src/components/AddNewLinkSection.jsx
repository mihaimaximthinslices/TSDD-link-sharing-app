import IllustrationEmpty from '../svg/illustration-empty'
import { clsx } from 'clsx'

export default function AddNewLinkSection() {
  return (
    <>
      <div className="w-full h-full p-4 bg-whiteM flex flex-col grow">
        <div className="w-full h-full bg-white p-6 flex flex-col grow rounded-xl items-center md:p-10">
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full flex justify-start items-center">
              <h1 className="font-instrumentSans font-semibold text-[24px] text-blackH">
                Customize your links
              </h1>
            </div>
            <div className="w-full flex justify-start">
              <p className="font-instrumentSans font-normal text-[16px] text-blackM">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center border border-purpleH rounded-md pt-[11px] pb-[11px] mt-10">
            <button className="font-instrumentSans text-[16px] text-purpleH font-semibold">
              + Add new link
            </button>
          </div>

          <div className="w-full flex justify-center items-center p-5 grow bg-whiteM mt-6">
            <div className="flex flex-col gap-6 md:gap-0">
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
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them. We’re
                    here to help you share your profiles with everyone!
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
        <div className="w-full p-4 flex justify-center bg-white md:p-10 md:pt-6 md:pb-6 md:justify-end">
          <button className="font-instrumentSans text-[16px] font-semibold text-white bg-purpleM w-full pt-[11px] pb-[11px] rounded-md md:w-[91px]">
            Save
          </button>
        </div>
      </div>
    </>
  )
}
