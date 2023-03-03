import React from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';

const login = () => {
    const {data: session} = useSession();
    // console.log(session);
    if (session) {
        return (
            <div>
                <h1 className="mt-7">Welcome, {session.user.email}</h1>
                <img src={session.user.image} alt="User Image" className='rounded-full w-12 h-12 mt-7'/>
                <p>What can we do for you today?</p>
            </div>
        );
    } else {
        return (
            <div>
                <h1>You Are Not Signed In</h1>
                <button onClick={() => signIn()}>Sign In</button>
            </div>
        );
    }

    
};

export default login;