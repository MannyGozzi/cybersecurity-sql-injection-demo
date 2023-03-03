import {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'

export default function Secret() {
    const { data: session, status } = useSession()
    const[content, setContent] = useState();

    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch('/api/secret');
            const json = await res.json();
            if(json && json.content && json.content !== ""){
                setContent(json.content);
            }
        }
        fetchData();
    }, [session]);

    if (typeof window !== 'undefined' && status==='loading') { 
        return null; 
    } else if(status === "unauthenticated"){
        return (
            <main>
                <h1>Please sign in</h1>
            </main>
        )
    } else if (status === "authenticated") {
        return (
        <main>
            <h1>Secret Page</h1>
            <p>{content}</p>
        </main>
        );
    }
}