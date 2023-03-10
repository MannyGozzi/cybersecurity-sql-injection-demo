import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "../components/navbar"
import Link from "next/link"

export default function Component() {
  const { data: session } = useSession()
  if(session) {
    return <div className='flex justify-center flex-col text-center items-center'>
        <h1 className="mt-7">Welcome</h1>
        <p className="mt-3">What can we do for you?</p>
        <div className='w-48 '>
        <Link href="/account">
            <button className='mt-5 w-full p-3'>
            Account
            </button>
        </Link>
        <Link href="/secret">
            <button className='mt-5 w-full p-3'>
            Secret
            </button>
        </Link>
        </div>
      </div>
  }
  return <div className='justify-center flex-col text-center'>
    <h1 className="mt-7 p-3 ">Welcome to Notably Bad</h1>
    <p className="mt-3 p-3 text-lg">Please sign in before continuing</p>
    <h1>(◠﹏◠)</h1>
    <button onClick={() => signIn()} className="mt-7 text-xl">Sign in</button>
  </div>
}