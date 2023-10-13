import IllustrationPhoneMockup from '../svg/illustration-phone-mockup'
import { useSelector } from 'react-redux'
import LinkCard, { availablePlatforms, platformData } from './LinkCard'
import { useDispatch } from 'react-redux'
import { setLinks } from '../store/ProfileReducer'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { GetStartedTip } from './GetStartedTip'
import { v4 as uuidv4 } from 'uuid'
import { clsx } from 'clsx'

export function LinkDrawer() {
  return (
    <div
      data-cy="nav-customize-links-profile-link-placeholder"
      className="z-10 w-[237px] h-[44px] rounded-md bg-grayH"
    ></div>
  )
}
export default function AddNewLinkSection() {
  const links = useSelector((state) => state.profile.links)

  const dispatch = useDispatch()

  const canAddNewLink = links.length < Object.keys(platformData).length

  const alreadySelected = links.map((link) => link.platform)

  const onDragEnd = (result) => {
    try {
      let newLocalLinks = Array.from(links)
      const [removed] = newLocalLinks.splice(result.source.index, 1)
      newLocalLinks.splice(result.destination.index, 0, removed)

      newLocalLinks = newLocalLinks.map((link, index) => {
        return {
          ...link,
          order: `${index + 1}`,
        }
      })

      dispatch(setLinks(newLocalLinks))
    } catch (err) {}
  }

  function addNewEmptyLink() {
    if (canAddNewLink) {
      const newPlatform = availablePlatforms.find(
        (platform) => !alreadySelected.includes(platform),
      )

      dispatch(
        setLinks([
          ...links,
          {
            order: links.length + 1,
            id: uuidv4(),
            platform: newPlatform,
            link: '',
          },
        ]),
      )
    }
  }

  return (
    <div className="flex-grow flex">
      <div className="w-full bg-whiteM flex gap-6 justify-center">
        <div className="sticky top-28 w-[560px] max-h-[834px] hidden 1xl:block bg-white rounded-xl mt-2 mb-6">
          <div className="relative">
            <div className="pt-24 pl-[115px]">
              <IllustrationPhoneMockup />
              <div className="flex flex-col items-center justify-center  w-full h-full absolute top-[53px] right-[12px]">
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
                <div
                  onClick={() => {
                    addNewEmptyLink()
                  }}
                  className={clsx(
                    'flex w-full justify-center border border-purpleH rounded-md pt-[11px] pb-[11px] mt-10 hover:bg-purpleS cursor-pointer',
                    !canAddNewLink && 'opacity-50 cursor-not-allowed',
                  )}
                >
                  <button
                    data-cy="customize-links-section-add-link-button"
                    className="font-instrumentSans text-[16px] text-purpleH font-semibold"
                  >
                    + Add new link
                  </button>
                </div>
                {links.length === 0 ? (
                  <GetStartedTip />
                ) : (
                  <div
                    data-cy="link-container"
                    className="flex flex-col gap-6 w-full mt-6 min-h-[332px] overflow-y-scroll"
                  >
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="droppable">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {links.map(
                              (
                                { id, order, linkNumber, platform, link },
                                index,
                              ) => (
                                <Draggable
                                  key={id}
                                  draggableId={id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <LinkCard
                                      provided={provided}
                                      snapshot={snapshot}
                                      id={order}
                                      link={link}
                                      platform={platform}
                                    />
                                  )}
                                </Draggable>
                              ),
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                )}
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
                  className={clsx(
                    'font-instrumentSans text-[16px] font-semibold text-white w-full pt-[11px] pb-[11px] rounded-md md:w-[91px]',
                    links.length > 0
                      ? 'bg-purpleH cursor-pointer hover:bg-purpleM'
                      : 'bg-purpleM cursor-not-allowed',
                  )}
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
