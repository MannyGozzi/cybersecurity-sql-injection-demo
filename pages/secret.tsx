import {useState, useEffect, useRef} from 'react'
import {useSession} from 'next-auth/react'

export default function Secret() {
    const { data: session, status } = useSession()
    const[content, setContent] = useState();
    const[created, setCreated] = useState(false);
    const secretRef = useRef();
    const [deleted, setDeleted] = useState(false);

    async function getProducts () {
        if (status !== "authenticated") return;
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getdata`, postData);
        const json = await res.json();
        if(json && json.products){
            setContent(json.products);
        }
    }

    async function addProduct () {
        const secret = secretRef.current.value.trim();
        if (secret.length < 3 || status !== "authenticated") return;
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: session.user.email,
                name: session.user.name,
                secret: secret
            }),
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getdata`, postData);
        // console.log(res);
        const json = await res.json();
        if (json.message !== "success") return;
        const newProduct = json.products;
        setContent([
            ...content, 
            {itemid: newProduct.itemid, name: newProduct.name, email: newProduct.email, secret: newProduct.secret},
        ]);
        setCreated(true);
    }

    async function deleteProduct(name, email, secret) {
        if (!name || !email || !secret) return;
        const postData = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                name: name,
                secret: secret
            }),
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getdata`, postData);
        const json = await res.json();

        if (json.message !== "success") return;
        setDeleted(true);
        console.log(json);
        console.log(name, email, secret);
        setContent(content.filter((item) => (item.name !== name || item.email !== email || item.secret !== secret)));
    }

    useEffect(()=>{
        getProducts();
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
            <main className='items-center text-black'>
                <h1>Secret Data</h1>
                <div className='flex flex-row gap-9'>
                    <div className='w-70'>
                    {content && content.map((user, index) => {
                        return <div key={user.itemid} className='p-5 mt-5 border-slate-300 border-2 rounded-lg'>
                            <h3>{user.name}</h3>
                            <h5>email: {user.email}</h5>
                            <p>secret: {user.secret}</p>
                            <button type="button" className="button mt-3" onClick={() => {deleteProduct(user.name, user.email, user.secret);}}>Delete</button>
                        </div>
                    })}
                    
                    </div>     
                    <form className='mt-3 w-70 flex flex-col items-start justify-start'>
                        <input className='w-full h-16 border-slate-300 border-2 rounded-lg p-3' ref={secretRef} type="text" name="secret" placeholder="New secret..."/>
                        <button type="button" className="button" onClick={() => {addProduct();}}>Add</button>
                        {created ? <strong className='text-green-600 mt-3'>(◠﹏◠) Success!</strong> : null}
                    </form>    
                </div>           
            </main>
        );
    }
}