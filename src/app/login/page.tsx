'use client'
import { login } from '@/actions/LoginUserAction'
import { InputLogin } from '@/type/typeUser'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Login() {
  const messageQuery = useSearchParams()
  const getMessageQuery = messageQuery.get('message')
  let [sent, setSent] = useState<boolean>(false)
  let [inputLogin, setInputLogin] = useState<InputLogin>({
    email: '',
    password: ''
  })

  let handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    setInputLogin({
      ...inputLogin,
      [name]: value
    })
  }

  let submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setSent(true)
      e.preventDefault()
      await login(inputLogin)
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          icon: 'error',
          text: error.message,
        });
      }
    } finally {
      setSent(false)
    }
  }

  useEffect(() => {
    if (getMessageQuery) {
      Swal.fire({
        title: "Success!",
        text: getMessageQuery,
        icon: "success"
      })
    }
  }, [getMessageQuery])

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left max-w-96">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Explore top-quality laptops for an unmatched experience. Shop now!</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={submitLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={handleInput}
                  name='email'
                  type="email"
                  placeholder="email"
                  className="input input-bordered bg-base-200"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={handleInput}
                  name='password'
                  type="password"
                  placeholder="password"
                  className="input input-bordered bg-base-200"
                  required
                />
              </div>
              <div className='mt-2'>
                <p className="text-sm">Don&apos;t have an account?
                  <Link className='underline hover:font-semibold text-sm ml-1' href={'/register'}>
                    Register
                  </Link>
                </p>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn bg-base-300 hover:bg-base-200">
                  {sent ? (
                    <div className="flex justify-center items-center">
                      <p className="font-semibold mr-2">Loading...</p>
                      <span className="loading loading-spinner loading-md"></span>
                    </div>
                  ) : (
                    <p>Login</p>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}