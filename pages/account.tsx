import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";

const account = () => {
    const { data: session, status } = useSession({ required: true });
    if (status === 'authenticated') {
        return (
            <div className="px-5">
                <h1 className="mt-7">Account Details</h1>
                <h2>Entries</h2>
                <ul>
                    <li>apples</li>
                    <li>bananas</li>
                    <li>advocados</li>
                    <li>secret thing</li>
                    <li>chocolate</li>
                </ul>
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

// forces redirect if we don't have a session
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