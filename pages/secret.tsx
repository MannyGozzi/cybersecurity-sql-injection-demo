import {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'

export default function Secret() {
    const { data: session, status } = useSession()
    const[content, setContent] = useState();

    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/api/getdata');
            const json = await res.json();
            if(json && json.products){
                setContent(json.products);
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
        );
    } else if (status === "authenticated") {
        return ( 
            <main className='items-center'>
                <h1>Secret Data</h1>
                <div className='w-70'>
                {content && content.map((user, index) => {
                    return <div key={user.email} className='p-5 mt-5 border-slate-300 border-2 rounded-lg'>
                        <h3>{user.name}</h3>
                        <h5>email: {user.email}</h5>
                        <p>secret: {user.secret}</p>
                    </div>
                })}
                </div>
            </main>
        );
    }
}