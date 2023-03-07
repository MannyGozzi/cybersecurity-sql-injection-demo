import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import Link from "next/link";

const account = () => {
    const { data: session, status } = useSession({ required: true });
    if (status === 'authenticated') {
        return (
            <div className="px-5 flex flex-col justify-center items-center ">
                <div className="p-7 rounded-xl hover:shadow-xl transition-all duration-300 border-4 border-slate-300 m-7">
                <h1 className="mt">Account Details</h1>
                <h2>Info</h2>
                <ul className="text-xl">
                    <li>This page is under construction.</li>
                    <li>Please come back at a later date.</li>
                </ul>
                </div>
                <div className=" justify-center flex items-center">
                <button className='mt-3'>
                    <Link href="/">← Return to Dashboard</Link>
                </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center">
                <p>You are not signed in.</p>
            </div>
        )
    }
}

export default account;

// forces redirect if we don't have a session
export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    
    return {
        props: { session },
    };
}