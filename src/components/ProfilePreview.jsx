import { clsx } from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import { LinkDrawer } from './DashboardMainScreen'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard/src'
import toast from 'react-hot-toast'
import IconLink from '../svg/icon-link'
export default function ProfilePreview() {
  const { profileId } = useParams()
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false)
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    base64ProfileImage: '',
    links: [],
  })
  useEffect(() => {
    axios
      .get('/status')
      .then((response) => {
        setIsAuth(true)
      })
      .catch((err) => {})
    axios
      .get(`/public/profile/${profileId}`)
      .then((res) => {
        const { firstName, lastName, email, base64ProfileImage, links } =
          res.data.profile

        setProfile({
          firstName,
          lastName,
          email,
          base64ProfileImage,
          links,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  let base64ProfileImage = profile.base64ProfileImage
  let firstName = profile.firstName
  let lastName = profile.lastName
  let email = profile.email

  const profileViewLinks = profile.links || []

  let showEmailPlaceholder = profileViewLinks.length === 0

  const diplayLinkPlaceholders = profileViewLinks.length === 0

  while (profileViewLinks.length < 5 && diplayLinkPlaceholders) {
    profileViewLinks.push({})
  }

  const displayName =
    (firstName && firstName.length) || (lastName && lastName.length)
  return (
    <div className="relative z-20">
      <div className="w-full md:bg-purpleH min-h-[357px] rounded-b-3xl top-0 z-0">
        {isAuth && (
          <div className="w-full p-6">
            <div className="w-full bg-white pl-2 pr-2 md:pl-6 md:pr-6 pt-4 md:pb-4 flex justify-center md:justify-between gap-6 rounded-xl">
              <div
                data-cy="profile-page-back-to-editor"
                onClick={() => {
                  navigate(`/dashboard`, { replace: false })
                }}
                className="pt-[10px] pb-[10px] pl-[27px] pr-[27px] border-purpleH border rounded-xl flex justify-center hover:bg-purpleS cursor-pointer w-[160px] md:w-fit"
              >
                <p className="text-purpleH">Back to editor</p>
              </div>
              <div
                data-cy="profile-page-share"
                className="pt-[10px] pb-[10px] pl-[27px] pr-[27px] border-purpleH text-white rounded-xl flex justify-center bg-purpleH  cursor-pointer w-[160px] md:w-fit hover:bg-purpleM"
              >
                <CopyToClipboard
                  text={window.location.href}
                  onCopy={() =>
                    toast('The link has been copied to your clipboard!', {
                      className: 'copy-to-clipboard-toast',
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
                      icon: <IconLink />,
                      position: 'bottom-center',
                    })
                  }
                >
                  <p className="text-white">Share link</p>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        data-cy="profile-page-card"
        className={clsx(
          'absolute z-30 flex justify-center left-1/2 transform -translate-x-1/2 -translate-y-[220px] md:-translate-y-44',
        )}
      >
        <div className="min-w-[349px] flex flex-col h-fit bg-white rounded-3xl pb-12">
          <div className="min-w-[349px] min-h-[569px] flex flex-col items-center h-fit bg-white md:pt-12 pb-12 pl-[56px] pr-[56px]  md:shadow-md rounded-3xl">
            {base64ProfileImage && (
              <div className="w-[100px] h-[100px] rounded-full z-10 bg-grayH border-purpleH border-4 flex-col items-center justify-center p-[1px]">
                <div
                  className="w-full h-full rounded-full z-10 bg-grayH "
                  data-cy="profile-page-image"
                  style={{
                    background: `url(${base64ProfileImage}) center/cover no-repeat`,
                  }}
                ></div>
              </div>
            )}
            <div
              className={clsx(
                'z-10 min-w-[160px] h-[16px]  mt-[26px] flex items-center justify-center',
                displayName ? 'bg-white' : 'bg-grayH rounded-xl',
              )}
            >
              {displayName && (
                <div
                  data-cy="profile-page-name"
                  className="flex justify-center w-full max-w-[260px] overflow-x-hidden gap-1"
                >
                  <p className="font-instrumentSans font-semibold text-[16px] text-blackH">
                    {firstName}
                  </p>
                  <p className="font-instrumentSans font-semibold text-[16px] text-blackH">
                    {lastName}
                  </p>
                </div>
              )}
            </div>
            {(email || showEmailPlaceholder) && (
              <div
                data-cy="profile-view-email-placeholder"
                className={clsx(
                  'z-10 min-w-[72px] h-[8px] rounded-xl mt-[13px]',
                  email && email.length ? 'bg-white' : 'bg-grayH rounded-xl',
                )}
              >
                {email && email.length > 0 && (
                  <div
                    data-cy="profile-page-email"
                    className="flex justify-center items-center max-w-[260px] overflow-x-hidden"
                  >
                    <p className="font-instrumentSans font-normal text-[14px] text-blackM">
                      {email}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col mt-[56px] gap-5">
              <div
                data-cy="profile-view-link-container"
                className="flex flex-col gap-5 min-w-[275px] items-center"
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
  )
}
