import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "../components/navbar"
import Link from "next/link"

export default function Component() {
  const { data: session } = useSession()
  if(session) {
    return <div className='flex justify-center flex-col text-center items-center'>
        <h1 className="mt-7">Welcome</h1>
        <p>What can we do for you?</p>
        <button className='mt-3'>
          <Link href="/account">Account</Link>
        </button>
        <button className='mt-3'>
          <Link href="/secret">Secret</Link>
        </button>
      </div>
  }
  return <div className='justify-center flex-col text-center'>
    <h1 className="mt-7">Welcome</h1>
    <p className="mt-3">Please sign in before continuing</p>
    <button onClick={() => signIn()} className="mt-7">Sign in</button>
  </div>
}