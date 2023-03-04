import { useSession, signOut, getSession, signIn } from "next-auth/react";

export default function Navbar() {
    const { data: session, status } = useSession();
    
    // console.log(session);
    if (status === 'authenticated' && session != undefined) {
        
        return (
            <>
                <div className="bg-slate-900 flex flex-row justify-between px-8 text-white">
                    <div className="flex flex-col items-start justify-start text-left p-2">
                        <h3 className="h-full">Welcome, {session.user.name} </h3>
                        <small className="h-full">{session.user.email}</small>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="mx-3" onClick={() => signOut()}>Sign out</button>
                        <img src={session.user.image} alt="User Image" className='rounded-full w-12 h-12'/>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className=" bg-slate-900 flex flex-row justify-between px-8 text-white">
                    <div className="flex flex-col items-start justify-start text-left p-2">
                        <h3 className="h-full">Welcome </h3>
                        <small className="h-full">We don't quite know you're name yet...</small>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="mx-3" onClick={() => signIn()}>Get Started</button>
                    </div>
                </div>
            </>
        )
    }
}