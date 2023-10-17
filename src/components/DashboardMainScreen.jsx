import IllustrationPhoneMockup from '../svg/illustration-phone-mockup'
import { useSelector } from 'react-redux'
import LinkCard, { availablePlatforms, platformData } from './LinkCard'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import {
  initProfile,
  setBase64ProfileImage,
  setEmail,
  setEmailError,
  setFirstName,
  setFirstNameError,
  setLastName,
  setLastNameError,
  setLinks,
} from '../store/ProfileReducer'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { GetStartedTip } from './GetStartedTip'
import { v4 as uuidv4 } from 'uuid'
import { clsx } from 'clsx'
import { IconArrowRight } from '../svg/icon-arrow-right'
import { useContext, useEffect, useRef } from 'react'
import {
  dashboardSections,
  NavigationContext,
} from '../store/NavigationContext'
import { IconUploadImage, IconUploadImageWhite } from '../svg/icon-upload-image'
import IconChangesSaved from '../svg/icon-changes-saved'
import axios from 'axios'

export function LinkDrawer({ platform, link }) {
  const data = platformData[platform] ?? null

  return (
    <div
      data-cy="profile-view-link-placeholder"
      className="z-10 w-[237px] h-[44px] rounded-md bg-grayH"
    >
      {platform && (
        <a
          href={link}
          target={'_blank'}
          className={clsx(
            'w-full h-[44px] rounded-md flex items-center pl-4 pr-4 justify-between border shadow-sm',
            link.length === 0 && 'pointer-events-none',
          )}
          style={{
            backgroundColor: data.profileView.bg,
          }}
        >
          <div className="flex gap-2">
            <div className="text-white">{data.profileView.icon}</div>
            <p
              className="font-instrumentSans text-center text-[12px]"
              style={{
                color: data.profileView.textCol || '#ffffff',
              }}
            >
              {data.name}
            </p>
          </div>
          {link.length !== 0 && (
            <div>
              {!data.profileView.arrow ? (
                <IconArrowRight />
              ) : (
                data.profileView.arrow
              )}
            </div>
          )}
        </a>
      )}
    </div>
  )
}

const copyObj = (obj) => JSON.parse(JSON.stringify(obj))
export default function DashboardMainScreen() {
  useEffect(() => {
    axios
      .get('/profile')
      .then((latestProfile) => {
        const { profile } = latestProfile.data
        if (!id) {
          dispatch(initProfile(profile))
        }
      })
      .catch((err) => {})
  }, [])
  const selectedDashboardSection =
    useContext(NavigationContext).navigation.dashboardSection

  const profile = useSelector((state) => state.profile)
  const {
    id,
    links,
    base64ProfileImage,
    firstName,
    lastName,
    email,
    emailError,
    firstNameError,
    lastNameError,
  } = profile

  const uploadImageInputRef = useRef()

  const dispatch = useDispatch()

  const canAddNewLink = links.length < Object.keys(platformData).length

  const alreadySelected = links.map((link) => link.platform)

  const profileViewLinks = copyObj(links)

  const diplayLinkPlaceholders =
    profileViewLinks.length === 0 ||
    selectedDashboardSection === dashboardSections.customizeLinks

  while (profileViewLinks.length < 5 && diplayLinkPlaceholders) {
    profileViewLinks.push({})
  }

  const handleSelectProfileImage = (event) => {
    const file = event.target.files[0]

    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const reader = new FileReader()

        let base64Image

        reader.onload = function (e) {
          base64Image = e.target.result
          const img = new Image()
          img.onload = function () {
            if (img.width <= 1024 && img.height <= 1024) {
              dispatch(setBase64ProfileImage(base64Image))
            } else {
              toast.error(
                'Image dimensions should be below 1024x1024 pixels.',
                {
                  className: 'upload-image-failed-toast',
                  style: {
                    backgroundColor: '#333333',
                    border: '1px solid black',
                    color: '#FAFAFA',
                    minWidth: '500px',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                  },
                  position: 'bottom-center',
                },
              )
              uploadImageInputRef.current.value = ''

              base64Image = ''
            }
          }

          img.src = base64Image
        }

        reader.readAsDataURL(file)
      } else {
        alert('Please upload a JPG or PNG image below 1024x1024 pixels.')
        uploadImageInputRef.value = ''
      }
    }

    if (!file) {
      dispatch(setBase64ProfileImage(null))
    }
  }

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
  function isValidURL(str) {
    try {
      new URL(str)
      return true
    } catch (error) {
      return false
    }
  }
  const handleSaveProfile = async () => {
    const validNameRegex = /^[A-Za-z\s\-']+$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const validationSchema = Yup.object().shape({
      links: Yup.array()
        .of(
          Yup.object().shape({
            link: Yup.string()
              .required("Can't be empty")
              .test('is-valid-url', 'Please check the URL', (value) => {
                return value ? isValidURL(value) : true
              }),
          }),
        )
        .min(1, 'Links array cannot be empty'),
      firstName: Yup.string()
        .required("Can't be empty")
        .matches(validNameRegex, 'Invalid name format'),
      lastName: Yup.string()
        .required("Can't be empty")
        .matches(validNameRegex, 'Invalid name format'),
    })

    const errors = {}
    await validationSchema
      .validate(profile, {
        abortEarly: false,
      })
      .catch((err) => {
        err.inner.forEach((error) => {
          errors[error.path] = error.message
        })
      })

    const newLinks = links.map((link, index) => {
      const newLink = { ...link }

      const linkError = `links[${index}].link`

      if (errors[linkError]) {
        newLink.error = errors[linkError]
      }
      return newLink
    })
    dispatch(setLinks(newLinks))

    if (errors.firstName) {
      dispatch(setFirstNameError(errors.firstName))
    }
    if (errors.lastName) {
      dispatch(setLastNameError(errors.lastName))
    }

    if (email && email.length > 0) {
      if (!emailRegex.test(email)) {
        errors.email = 'Invalid email format'
        dispatch(setEmailError('Invalid email format'))
      }
    }

    if (!Object.keys(errors).length) {
      const cleanLinks = links.map((dLink) => {
        return {
          link: dLink.link,
          platform: dLink.platform,
        }
      })

      const cleanPayload = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        links: cleanLinks,
        base64ProfileImage: profile.base64ProfileImage,
      }

      Object.keys(cleanPayload).forEach((key) => {
        if (cleanPayload[key] === null) {
          delete cleanPayload[key]
        }
      })

      await axios.put('/profile', cleanPayload)

      const uploadedProfile = await axios.get('/profile')

      if (!id) {
        dispatch(initProfile(uploadedProfile.data.profile))
      }

      toast('Your changes have been successfully saved!', {
        className: 'save-changes-success-toast',
        style: {
          backgroundColor: '#333333',
          border: '1px solid black',
          color: '#FAFAFA',
          minWidth: '420px',
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '24px',
          paddingRight: '24px',
        },
        icon: <IconChangesSaved />,
        position: 'bottom-center',
      })
    } else {
      toast.error('Not all required fields are completed!', {
        className: 'save-changes-success-toast',
        style: {
          backgroundColor: '#333333',
          border: '1px solid black',
          color: '#FAFAFA',
          minWidth: '420px',
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '24px',
          paddingRight: '24px',
        },
        position: 'bottom-center',
      })
    }
  }

  return (
    <div className="flex-grow flex">
      <div className="w-full bg-whiteM flex gap-6 justify-center">
        <div className="sticky top-28 w-[560px] h-[834px] hidden 1xl:block bg-white rounded-xl mt-2 mb-6">
          <div className="relative">
            <div className="pt-24 pl-[115px]">
              <IllustrationPhoneMockup />
              <div className="w-full h-full absolute top-[160px] right-[12px] flex flex-col items-center">
                <div className="flex flex-col items-center justify-center">
                  {base64ProfileImage ? (
                    <div className="w-[100px] h-[100px] rounded-full z-10 bg-grayH border-purpleH border-4 flex-col items-center justify-center p-[1px]">
                      <div
                        className="w-full h-full rounded-full z-10 bg-grayH "
                        data-cy="nav-customize-links-profile-picture-placeholder"
                        style={{
                          background: `url(${base64ProfileImage}) center/cover no-repeat`,
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div
                      className="w-[96px] h-[96px] rounded-full z-10 bg-grayH"
                      data-cy="nav-customize-links-profile-picture-placeholder"
                    ></div>
                  )}

                  <div
                    data-cy="profile-view-name-placeholder"
                    className={clsx(
                      'z-10 min-w-[160px] h-[16px]  mt-[26px] flex items-center justify-center',
                      (firstName && firstName.length) ||
                        (lastName && lastName.length)
                        ? 'bg-white'
                        : 'bg-grayH rounded-xl',
                    )}
                  >
                    <div className="flex justify-center w-full max-w-[260px] overflow-x-hidden gap-1">
                      <p className="font-instrumentSans font-semibold text-[16px] text-blackH">
                        {firstName}
                      </p>
                      <p className="font-instrumentSans font-semibold text-[16px] text-blackH">
                        {lastName}
                      </p>
                    </div>
                  </div>
                  <div
                    data-cy="profile-view-email-placeholder"
                    className={clsx(
                      'z-10 min-w-[72px] h-[8px] rounded-xl mt-[13px]',
                      email && email.length
                        ? 'bg-white'
                        : 'bg-grayH rounded-xl',
                    )}
                  >
                    {email && email.length > 0 && (
                      <div className="flex justify-center items-center max-w-[260px] overflow-x-hidden">
                        <p className="font-instrumentSans font-normal text-[14px] text-blackM">
                          {email}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col mt-[56px] gap-5">
                  <div
                    data-cy="profile-view-link-container"
                    className="flex flex-col gap-5 h-[300px] overflow-y-scroll min-w-[275px] items-center"
                  >
                    {profileViewLinks.map((link, index) => {
                      return <LinkDrawer key={uuidv4()} {...link} />
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grow max-w-[808px]">
          {selectedDashboardSection === dashboardSections.customizeLinks && (
            <div className="w-full min-h-[864px] bg-whiteM flex flex-col grow">
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
                                  {
                                    id,
                                    order,
                                    linkNumber,
                                    platform,
                                    link,
                                    error,
                                  },
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
                                        error={error}
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
                    disabled={links.length === 0}
                    onClick={() => handleSaveProfile()}
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
          )}

          {selectedDashboardSection ===
            dashboardSections.updateProfileDetails && (
            <div className="w-full h-full bg-whiteM flex flex-col grow max-h-[960px]">
              <div className="w-full h-full p-4 md:pb-6 md:pt-2 bg-whiteM flex flex-col grow 1xl:p-0 1xl:pb-6 1xl:pt-2">
                <div className="w-full h-full bg-white p-6 flex flex-col grow rounded-xl items-center md:p-10">
                  <div className="flex flex-col gap-2 w-full pb-10">
                    <div className="w-full flex justify-start items-center">
                      <h1
                        data-cy="update-profile-details-section-title"
                        className="font-instrumentSans font-semibold text-[24px] text-blackH"
                      >
                        Profile Details
                      </h1>
                    </div>
                    <div className="w-full flex justify-start">
                      <p
                        data-cy="update-profile-details-section-info"
                        className="font-instrumentSans font-normal text-[16px] text-blackM"
                      >
                        Add your details to create a personal touch to your
                        profile.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 w-full pb-6">
                    <div className="p-5 bg-whiteM w-full flex flex-col gap-4 rounded-md">
                      <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex flex-col items-start justify-center w-[240px]">
                          <p className="font-instrumentSans font-normal text-[16px] text-blackM">
                            Profile picture
                          </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6">
                          <div
                            onClick={() => {
                              uploadImageInputRef.current.click()
                            }}
                            className=" relative w-[193px] h-[193px] bg-purpleS rounded-xl flex flex-col items-center justify-center cursor-pointer"
                          >
                            <div
                              data-cy="update-profile-section-image-upload-zone"
                              className="flex flex-col gap-2 w-full items-center"
                            >
                              <input
                                data-cy="update-profile-section-image-upload-zone-input"
                                ref={uploadImageInputRef}
                                onChange={handleSelectProfileImage}
                                type="file"
                                id="imageInput"
                                className="hidden"
                                accept=".jpg, .jpeg, .png"
                              />
                              <IconUploadImage />
                              <p className="font-instrumentSans font-normal text-[16px] text-purpleH">
                                + Upload Image
                              </p>
                              {base64ProfileImage && (
                                <div
                                  className=" top-0 absolute w-[193px] h-[193px] rounded-md shadow-sm flex flex-col items-center justify-center"
                                  style={{
                                    background: `url(${base64ProfileImage}) center/cover no-repeat`,
                                  }}
                                >
                                  <div
                                    className=" top-0 absolute w-[193px] h-[193px] rounded-md shadow-sm flex flex-col items-center justify-center"
                                    style={{
                                      backgroundColor: 'black',
                                      opacity: '50%',
                                    }}
                                  ></div>
                                  <div className="z-10 flex flex-col items-center justify-center">
                                    <IconUploadImageWhite />
                                    <p className="font-instrumentSans font-normal text-[16px] text-white">
                                      Change Image
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="md:flex flex-col md:items-center md:justify-center">
                            <p className="font-instrumentSans font-normal text-[12px] text-blackM md:max-w-[215px]">
                              Image must be below 1024x1024px. Use PNG or JPG
                              format.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 bg-whiteM w-full flex flex-col gap-3 rounded-md">
                      <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center relative">
                        <label
                          data-cy="update-profile-section-first-name-label"
                          className="text-blackH font-instrumentSans text-[12px] md:text-[16px] md:text-blackM"
                        >
                          First name*
                        </label>
                        <div className="absolute right-4 bottom-[14px]">
                          {firstNameError && (
                            <span className="font-instrumentSans text-redH text-[12px]">
                              {firstNameError}
                            </span>
                          )}
                        </div>
                        <input
                          onChange={(e) => {
                            dispatch(setFirstName(e.target.value))
                          }}
                          onFocus={() => {
                            dispatch(setFirstNameError(null))
                          }}
                          defaultValue={firstName}
                          data-cy="update-profile-section-first-name-input"
                          placeholder="e.g. John"
                          className={clsx(
                            'border-blackS font-instrumentSans text-blackM shadow-purpleH h-12 items-center rounded-lg border p-4 text-[16px] md:w-[413px]',
                            firstNameError &&
                              'focus:outline-redH outline outline-redH outline-1',
                            firstNameError &&
                              'text-white md:text-blackM placeholder-white md:placeholder-gray-400',
                          )}
                          type="text"
                        ></input>
                      </div>
                      <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center relative">
                        <label
                          data-cy="update-profile-section-last-name-label"
                          className="text-blackH font-instrumentSans text-[12px] md:text-[16px] md:text-blackM"
                        >
                          Last name*
                        </label>
                        <div className="absolute right-4 bottom-[14px]">
                          {lastNameError && (
                            <span className="font-instrumentSans text-redH text-[12px]">
                              {lastNameError}
                            </span>
                          )}
                        </div>
                        <input
                          onChange={(e) => {
                            dispatch(setLastName(e.target.value))
                          }}
                          onFocus={() => {
                            dispatch(setLastNameError(null))
                          }}
                          defaultValue={lastName}
                          data-cy="update-profile-section-last-name-input"
                          placeholder="e.g. Appleseed"
                          className={clsx(
                            'border-blackS font-instrumentSans text-blackM shadow-purpleH h-12 items-center rounded-lg border p-4 text-[16px] md:w-[413px]',
                            lastNameError &&
                              'focus:outline-redH outline outline-redH outline-1',
                            lastNameError &&
                              'text-white md:text-blackM placeholder-white md:placeholder-gray-400',
                          )}
                          type="text"
                        ></input>
                      </div>
                      <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center relative">
                        <label
                          data-cy="update-profile-section-email-label"
                          className="text-blackH font-instrumentSans text-[12px] md:text-[16px] md:text-blackM"
                        >
                          Email
                        </label>

                        <div className="absolute right-4 bottom-[14px]">
                          {emailError && (
                            <span className="font-instrumentSans text-redH text-[12px]">
                              {emailError}
                            </span>
                          )}
                        </div>
                        <input
                          onChange={(e) => {
                            dispatch(setEmail(e.target.value))
                          }}
                          onFocus={() => {
                            dispatch(setEmailError(null))
                          }}
                          defaultValue={email}
                          data-cy="update-profile-section-email-input"
                          placeholder="e.g. email@example.com"
                          className={clsx(
                            'border-blackS font-instrumentSans text-blackM shadow-purpleH h-12 items-center rounded-lg border p-4 text-[16px] md:w-[413px]',
                            emailError &&
                              'focus:outline-redH outline outline-redH outline-1',
                            emailError &&
                              'text-white md:text-blackM placeholder-white md:placeholder-gray-400',
                          )}
                          type="text"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div
                    className="w-full bg-blackS"
                    style={{
                      height: '1px',
                    }}
                  ></div>
                  <div className="w-full p-4 md:p-6 md:pr-10 flex justify-center bg-white rounded-b-xl md:justify-end">
                    <button
                      disabled={links.length === 0}
                      data-cy="customize-links-section-save-button"
                      onClick={() => handleSaveProfile()}
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
          )}
        </div>
      </div>
    </div>
  )
}
