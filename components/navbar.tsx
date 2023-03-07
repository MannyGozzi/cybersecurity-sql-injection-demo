import { useSession, signOut, getSession, signIn } from "next-auth/react";

export default function Navbar() {
    const { data: session, status } = useSession();
    //console.log(session);
    
    // console.log(session);
    if (status === 'authenticated' && session != undefined) {
        return (
            <>
                <div className="bg-slate-100 flex flex-row justify-between px-8 text-slate-900 border-b-slate-300 border-b-4 border-gray-300">
                    <div className="flex flex-col items-start justify-start text-left p-2">
                        <h3 className="h-full">Welcome, {session.user.name} </h3>
                        <small className="h-full">{session.user.email}</small>
                    </div>
                    <div className="flex items-center justify-center">
                        <h1>Notably Bad &#xFE19; </h1>
                        <button className="mx-3 hover:bg-white hover:text-black transition-all duration-150 ease-out" onClick={() => signOut()}>Sign out</button>
                        <img src={session.user.image} alt="User Image" className='rounded-full w-12 h-12'/>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="bg-slate-100 flex flex-row justify-between px-8 text-slate-900 border-b-slate-300 border-b-4 border-gray-300">
                    <div className="flex flex-col items-start justify-start text-left p-2">
                        <h3 className="h-full">Welcome </h3>
                        <small className="h-full">We don't quite know you're name yet...</small>
                    </div>
                    <div className="flex items-center justify-center">
                        <h1>Notably Bad &#xFE19; </h1>
                        <button className="mx-3 hover:bg-white hover:text-black transition-all duration-150 ease-out" onClick={() => signIn()}>Get Started</button>
                    </div>
                </div>
            </>
        )
    }
}