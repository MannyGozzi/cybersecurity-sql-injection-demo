import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";

const account = () => {
    const { data: session, status } = useSession({ required: true });
    if (status === 'authenticated') {
        return (
            <div>
                <h1>Welcome, {session.user.name}</h1>
                <img src={session.user.image} alt="User Image" className='rounded-full'/>
                <button onClick={()=>signOut()}>Sign Out</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not signed in.</p>
            </div>
        )
    }
}

export default account;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    
    return {
        props: { session },
    };
}