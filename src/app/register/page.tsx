import Link from 'next/link'
import type { Metadata } from 'next'
import { createUser } from '@/actions/RegisterUserAction'
import NotificationError from '@/components/NotificationError'
import ButtonSubmitRegister from '@/components/ButtonSubmitRegister'

export const metadata: Metadata = {
  title: 'Laptop Room - Register',
  description: 'Welcome to Laptop Room - Register',
}

export default function Register({ searchParams }: {
  searchParams: { [error: string]: string | string[] | undefined }
}) {
  let errorMessage = searchParams.error
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left max-w-96">
            <h1 className="text-5xl font-bold">Welcome to Your Laptop Room!</h1>
            <p className="py-6">Discover the finest selection of laptops for an unparalleled computing experience. Your journey to the perfect laptop starts here.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <NotificationError errorMessage={errorMessage} />
            <form action={createUser} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full name</span>
                </label>
                <input
                  name='name'
                  type="text"
                  placeholder="name"
                  className="input input-bordered bg-base-200"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  name='username'
                  type="text"
                  placeholder="username"
                  className="input input-bordered bg-base-200"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
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
                  name='password'
                  type="password"
                  placeholder="password"
                  className="input input-bordered bg-base-200"
                  required
                />
              </div>
              <div className='mt-2'>
                <p className="text-sm">Already have an account?
                  <Link className='underline hover:font-semibold text-sm ml-1' href={'/login'}>
                    Login
                  </Link>
                </p>
              </div>
              <div className="form-control mt-6">
                <ButtonSubmitRegister errorMessage={errorMessage} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
