import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if(session) {
    return <div className='flex justify-center flex-col text-center'>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  }
  return <div className='w-full flex justify-center flex-col text-center'>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
  </div>
}