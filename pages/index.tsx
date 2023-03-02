import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "../components/navbar"

export default function Component() {
  const { data: session } = useSession()
  if(session) {
    return <>
      <div className='flex justify-center flex-col text-center items-center'>
        <h1 className="mt-7">Welcome</h1>
        <p>What can we do for you?</p>
        <a href="/account" className='button mt-3'>Account</a>
      </div>
    </> 
  }
  return <div className='justify-center flex-col text-center'>
    <h1 className="mt-7">Welcome</h1>
    <p className="mt-3">Please sign in before continuing</p>
    <button onClick={() => signIn()} className="mt-7">Sign in</button>
  </div>
}