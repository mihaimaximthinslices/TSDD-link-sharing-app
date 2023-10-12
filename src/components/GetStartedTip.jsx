import IllustrationEmpty from '../svg/illustration-empty'

export function GetStartedTip() {
  return (
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
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We’re here to help
              you share your profiles with everyone!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
