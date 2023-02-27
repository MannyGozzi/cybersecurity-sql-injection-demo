import React from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';

const login = () => {
    const {data: session} = useSession();
    console.log(session);
    if (session) {
        return (
            <div>
                <h1>Welcome, {session.user.email}</h1>
                <img src={session.user.image} alt="User Image" className='rounded-full'/>
                <p>What can we do for you today?</p>
                <button onClick={() => signOut()}>Sign Out</button>
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