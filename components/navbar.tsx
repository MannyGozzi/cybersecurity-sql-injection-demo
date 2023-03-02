import { useSession, signOut, getSession } from "next-auth/react";

export default function Navbar() {
    const { data: session, status } = useSession();
    

    if (status === 'authenticated' && session != undefined) {
        return (
            <>
                <div className=" bg-slate-800 flex flex-row justify-between pr-3 pl-3 text-white">
                    <div className="flex flex-col items-start justify-start text-left p-2">
                        <h3 className="h-full">Welcome </h3>
                        <small className="h-full">{session.user.email}</small>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="mx-3" onClick={() => signOut()}>Sign out</button>
                        <img src={session.user.image} alt="User Image" className='rounded-full w-12 h-12'/>
                    </div>
                </div>
            </>
        )
    }
}