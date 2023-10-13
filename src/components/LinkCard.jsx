import IconDragAndDrop from '../svg/icon-drag-and-drop'
import IconGithub from '../svg/icon-github'
import IconFrontendMentor from '../svg/icon-frontend-mentor'
import IconTwitter from '../svg/icon-twitter'
import IconLinkedin from '../svg/icon-linkedin'
import IconFacebook from '../svg/icon-facebook'
import IconTwitch from '../svg/icon-twitch'
import IconDevto from '../svg/icon-devto'
import IconCodewars from '../svg/icon-codewars'
import IconCodepen from '../svg/icon-codepen'
import IconFreecodecamp from '../svg/icon-freecodecamp'
import IconGitlab from '../svg/icon-gitlab'
import IconHashnode from '../svg/icon-hashnode'
import IconStackoverflow from '../svg/icon-stack-overflow'
import IconChevronDown from '../svg/icon-chevron-down'
import IconLink from '../svg/icon-link'
import { useSelector, useDispatch } from 'react-redux'
import { clsx } from 'clsx'
import { useState } from 'react'
import { setLinks } from '../store/ProfileReducer'

export const availablePlatforms = [
  'github',
  'frontendmentor',
  'twitter',
  'linkedin',
  'youtube',
  'facebook',
  'twitch',
  'devto',
  'codewars',
  'codepen',
  'freecodecamp',
  'gitlab',
  'hashnode',
  'stackoverflow',
]
export const platformData = {
  github: {
    key: 'github',
    name: 'GitHub',
    dataId: 'link-card-platform-option-github',
    exampleLink: 'e.g. https://www.github.com/johnappleseed',
    icon: <IconGithub />,
  },
  frontendmentor: {
    key: 'frontendmentor',
    name: 'Frontend Mentor',
    dataId: 'link-card-platform-option-frontend-mentor',
    exampleLink: 'https://',
    icon: <IconFrontendMentor />,
  },
  twitter: {
    key: 'twitter',
    name: 'Twitter',
    dataId: 'link-card-platform-option-twitter',
    exampleLink: 'https://',
    icon: <IconTwitter />,
  },
  linkedin: {
    key: 'linkedin',
    name: 'LinkedIn',
    dataId: 'link-card-platform-option-linkedin',
    exampleLink: 'https://',
    icon: <IconLinkedin />,
  },
  youtube: {
    key: 'youtube',
    name: 'YouTube',
    dataId: 'link-card-platform-option-youtube',
    exampleLink: 'https://',
    icon: <IconGithub />,
  },
  facebook: {
    key: 'facebook',
    name: 'Facebook',
    dataId: 'link-card-platform-option-facebook',
    exampleLink: 'https://',
    icon: <IconFacebook />,
  },
  twitch: {
    key: 'twitch',
    name: 'Twitch',
    dataId: 'link-card-platform-option-twitch',
    exampleLink: 'https://',
    icon: <IconTwitch />,
  },
  devto: {
    key: 'devto',
    name: 'Dev.to',
    dataId: 'link-card-platform-option-devto',
    exampleLink: 'https://',
    icon: <IconDevto />,
  },
  codewars: {
    key: 'codewars',
    name: 'Codewars',
    dataId: 'link-card-platform-option-codewars',
    exampleLink: 'https://',
    icon: <IconCodewars />,
  },
  codepen: {
    key: 'codepen',
    name: 'Codepen',
    dataId: 'link-card-platform-option-codepen',
    exampleLink: 'https://',
    icon: <IconCodepen />,
  },
  freecodecamp: {
    key: 'freecodecamp',
    name: 'freeCodeCamp',
    dataId: 'link-card-platform-option-freecodecamp',
    exampleLink: 'https://',
    icon: <IconFreecodecamp />,
  },
  gitlab: {
    key: 'gitlab',
    name: 'GitLab',
    dataId: 'link-card-platform-option-gitlab',
    exampleLink: 'https://',
    icon: <IconGitlab />,
  },
  hashnode: {
    key: 'hashnode',
    name: 'Hashnode',
    dataId: 'link-card-platform-option-hashnode',
    exampleLink: 'https://',
    icon: <IconHashnode />,
  },
  stackoverflow: {
    key: 'stackoverflow',
    name: 'Stack Overflow',
    dataId: 'link-card-platform-option-stackoverflow',
    exampleLink: 'https://',
    icon: <IconStackoverflow />,
  },
}

const platformOptions = Object.keys(platformData)
export default function LinkCard({ id, platform, link, provided, snapshot }) {
  const { dataId, exampleLink, icon } = platformData[platform]

  const [showOptions, setShowOptions] = useState(false)

  const links = useSelector((state) => state.profile.links)

  const dispatch = useDispatch()

  const alreadySelected = links.map((link) => link.platform)

  const [selectedPlatform, setSelectedPlatform] = useState(
    platformData[platform],
  )

  return (
    <div
      ref={provided.innerRef}
      snapshot={snapshot}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="draggableItem"
    >
      <div
        data-cy="link-card"
        className="bg-whiteM p-5 flex flex-col rounded-xl gap-3"
      >
        <div className="flex justify-between items-cente">
          <div className="flex gap-2 items-center">
            <IconDragAndDrop />
            <span
              data-cy="link-card-title"
              className="font-instrumentSans text-[16px] text-blackM font-bold"
            >
              Link #{id}
            </span>
          </div>
          <button
            data-cy="link-card-remove"
            onClick={() => {
              let oldOrder
              let newLinks = links.filter((pLink) => {
                if (pLink.platform !== selectedPlatform.key) {
                  return pLink
                } else {
                  oldOrder = pLink.order
                }
              })

              newLinks = newLinks.map((pLink) => {
                if (pLink.order > oldOrder) {
                  return {
                    ...pLink,
                    order: pLink.order - 1,
                  }
                }
                return pLink
              })

              dispatch(setLinks(newLinks))
            }}
            className="font-instrumentSans text-[16px] text-blackM font-regular"
          >
            Remove
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col w-full gap-1 relative ">
            <label className="font-instrumentSans text-[12px] text-blackH font-regular">
              Platform
            </label>
            <div
              data-cy="link-card-platform"
              onClick={() => setShowOptions((old) => !old)}
              className="flex flex-col w-full gap-1 relative"
            >
              <div className="absolute top-[16px] left-4">
                {selectedPlatform.icon}
              </div>
              <div
                className={clsx(
                  'cursor-pointer absolute right-4 top-[20px]',
                  showOptions && 'transform: rotate-180',
                )}
              >
                <IconChevronDown />
              </div>
              <button className="pt-3 pl-[40px] pr-4 pb-3 rounded-md border border-blackS bg-no-repeat bg-custom-arrow-up text-left bg-white font-instrumentSans text-blackH text-[16px]">
                {selectedPlatform.name}
              </button>
            </div>
            {showOptions && (
              <div className="bg-white rounded-xl w-full max-h-[220px] overflow-y-scroll">
                {platformOptions.map((option, index) => {
                  return (
                    !alreadySelected.includes(platformData[option].key) && (
                      <div
                        data-cy={platformData[option].dataId}
                        key={dataId + platformData[option].key}
                        onClick={() => {
                          const newLinks = links.map((pLink) => {
                            if (pLink.platform === selectedPlatform.key) {
                              return {
                                ...pLink,
                                platform: platformData[option].key,
                                link: '',
                              }
                            }

                            return pLink
                          })

                          dispatch(setLinks(newLinks))

                          setSelectedPlatform(platformData[option])
                          setShowOptions(false)
                        }}
                        className="relative w-full"
                      >
                        <div className="absolute top-[15px] left-4">
                          {platformData[option].icon}
                        </div>
                        <button
                          className={clsx(
                            selectedPlatform.key === platformData[option].key &&
                              'text-purpleH',
                            'w-full pt-3 pl-[40px] pr-4 pb-3 rounded-md bg-no-repeat text-left bg-white font-instrumentSans text-blackH text-[16px] hover:text-purpleH',
                          )}
                        >
                          {platformData[option].name}
                        </button>
                        {index === platformOptions.length - 1 ? null : (
                          <div className="w-full pl-4 pr-4">
                            <div className="w-full bg-blackS h-[1px]"></div>
                          </div>
                        )}
                      </div>
                    )
                  )
                })}
              </div>
            )}
          </div>
          <div className=" flex flex-col w-full gap-1 relative">
            <label className="font-instrumentSans text-[12px] text-blackH font-regular">
              Link
            </label>
            <div className="absolute top-[38px] left-4">
              <IconLink />
            </div>
            <input
              data-cy="link-card-link"
              type="text"
              defaultValue={link}
              placeholder={selectedPlatform.exampleLink}
              className="pt-3 pl-[40px] pr-4 pb-3 rounded-md border border-blackS font-instrumentSans text-[16px] text-blackH font-normal"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
