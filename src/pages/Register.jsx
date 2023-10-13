import LogoDevLinksLarge from '../svg/logo-devlinks-large'
import IconEmail from '../svg/icon-email'
import IconPassword from '../svg/icon-password'
import * as Yup from 'yup'
import { useRef, useState, useContext } from 'react'
import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { AuthContext } from '../store/AuthContext'

const RegisterUserFormValidationSchema = Yup.object().shape({
  email: Yup.string().email('Please check again').required("Can't be empty"),
  password: Yup.string()
    .min(8, 'Password too short')
    .required("Can't be empty"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Please check again')
    .required("Can't be empty"),
})

export default function Register() {
  const { setUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    }

    const errors = {}

    await RegisterUserFormValidationSchema.validate(data, {
      abortEarly: false,
    }).catch((err) => {
      err.inner.forEach((error) => {
        errors[error.path] = error.message
      })
    })

    setErrors(errors)

    if (!Object.keys(errors).length) {
      try {
        await axios.post('/register', data)
        setUser((old) => {
          return {
            ...old,
            isAuthenticated: true,
          }
        })
        navigate('/dashboard', { replace: true })
      } catch (err) {
        if (err.response.status === 409) {
          setErrors({
            email: 'User already exists',
          })
        }
      }
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center bg-white p-8 md:bg-whiteM md:justify-center">
      <div>
        <div className="flex justify-items-start bg-white pb-16 md:justify-center md:pb-[41px] md:md:bg-whiteM">
          <LogoDevLinksLarge />
        </div>

        <div className="w-fit bg-white pb-2 md:p-10">
          <h1 className="font-instrumentSans text-2xl font-semibold">
            Create account
          </h1>

          <p className="font-instrumentSans text-blackM pb-10 pt-2 text-[16px] font-normal">
            Let's get you started sharing your links!
          </p>

          <form
            className="flex w-[311px] md:w-[395px] flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label
                data-cy="email-address-input-label"
                htmlFor="email"
                className={clsx(
                  'font-instrumentSans pb-1 text-[12px]',
                  'text-blackH',
                  errors.email && 'text-redH',
                )}
              >
                Email address
              </label>

              <div className="relative left-4 top-4">
                <IconEmail className="absolute" />
              </div>

              <div className="relative">
                {errors.email && (
                  <span className="absolute font-instrumentSans text-redH text-[12px] top-4 right-4">
                    {errors.email}
                  </span>
                )}
              </div>

              <input
                autoComplete="off"
                data-cy="email-address-input"
                className={clsx(
                  'border-blackS font-instrumentSans text-blackM shadow-purpleH h-12 items-center rounded-lg border pb-3 pl-10 pr-2 pt-[11px] text-[16px]',
                  'focus:outline-purpleH',
                  errors.email &&
                    'focus:outline-redH outline outline-redH outline-1',
                  errors.email && 'text-white md:text-blackM',
                )}
                type="text"
                id="email"
                placeholder="eg. alex@gmail.com"
                onFocus={() => {
                  setErrors({ ...errors, email: '' })
                }}
                ref={emailRef}
              />
            </div>

            <div className="flex flex-col">
              <label
                data-cy="password-input-label"
                htmlFor="password"
                className={clsx(
                  'font-instrumentSans pb-1 text-[12px]',
                  'text-blackH',
                  errors.password && 'text-redH',
                )}
              >
                Create password
              </label>
              <div className="relative left-4 top-4">
                <IconPassword className="absolute" />
              </div>

              <div className="relative">
                {errors.password && (
                  <span className="absolute font-instrumentSans text-redH text-[12px] top-4 right-4">
                    {errors.password}
                  </span>
                )}
              </div>

              <input
                autoComplete="off"
                data-cy="password-input"
                className={clsx(
                  'border-blackS font-instrumentSans text-blackM shadow-purpleH h-12 items-center rounded-lg border pb-3 pl-10 pr-2 pt-[11px] text-[16px]',
                  'focus:outline-purpleH',
                  errors.password &&
                    'focus:outline-redH outline outline-redH outline-1',
                  errors.password && 'text-white md:text-blackM',
                )}
                type="password"
                id="password"
                placeholder="At least 8 characters"
                onFocus={() => {
                  setErrors({ ...errors, password: '' })
                }}
                ref={passwordRef}
              />
            </div>

            <div className="flex flex-col">
              <label
                data-cy="confirmPassword-input-label"
                htmlFor="confirmPassword"
                className={clsx(
                  'font-instrumentSans pb-1 text-[12px]',
                  'text-blackH',
                  errors.confirmPassword && 'text-redH',
                )}
              >
                Confirm password
              </label>
              <div className="relative left-4 top-4">
                <IconPassword className="absolute" />
              </div>

              <div className="relative">
                {errors.confirmPassword && (
                  <span className="absolute font-instrumentSans text-redH text-[12px] top-4 right-4">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <input
                autoComplete="off"
                data-cy="confirmPassword-input"
                className={clsx(
                  'border-blackS font-instrumentSans text-blackM shadow-purpleH h-12 items-center rounded-lg border pb-3 pl-10 pr-2 pt-[11px] text-[16px]',
                  'focus:outline-purpleH',
                  errors.confirmPassword &&
                    'focus:outline-redH outline outline-redH outline-1',
                  errors.confirmPassword && 'text-white md:text-blackM',
                )}
                type="password"
                id="confirmPassword"
                placeholder="At least 8 characters"
                onFocus={() => {
                  setErrors({ ...errors, confirmPassword: '' })
                }}
                ref={confirmPasswordRef}
              />
            </div>

            <span className="font-instrumentSans text-blackM text-[12px]">
              Password must contain at least 8 characters
            </span>

            <button
              type="submit"
              data-cy="create-account-button"
              className="bg-purpleH font-instrumentSans hover:bg-purpleM rounded-xl pb-[11px] pl-[27px] pr-[27px] pt-[11px] text-[16px] font-semibold text-white"
            >
              Create new account
            </button>

            <div className="flex w-full flex-col items-center justify-center gap-1 md:flex-row md:justify-around">
              <p className="font-instrumentSans text-blackM text-[16px] font-normal">
                Already have an account?
                <br className="md:hidden" />
                <a
                  className="font-instrumentSans text-purpleH text-center text-[16px] font-normal hidden md:inline pl-1"
                  href="/login"
                >
                  Login
                </a>
              </p>
              <a
                className="font-instrumentSans text-purpleH text-center text-[16px] font-normal md:hidden"
                href="/login"
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
