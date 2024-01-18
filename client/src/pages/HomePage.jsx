import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function HomePage() {

    const {id} = useParams();

    const [redirect, setRedirect] = useState(null);
    const [places, setPlaces] = useState([]);

    const {ready, user, setUser} = useContext(UserContext);

    useEffect(() => {
        axios.get('/posts').then(response => {
            setPlaces([...response.data])
        }) 
    }, [])

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'Carregando...'
    };

    if (ready && !user && !redirect) {
        return (
            <div className='mt-8 gap-x-6 gap-y-8 md:grid lg:grid md:grid-cols-3 lg:grid-cols-4'>
                <p></p>
                {places?.length > 0 && places?.map((post,i) => {
                    return (
                        <Link to={'/post/'+post._id} key={i}>
                        <div className='bg-gray-500 mb-2 rounded-2xl flex'>
                            {post.photos?.[0] && (
                                <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/'+post.photos?.[0]} />
                            )}
                        </div>
                        <h2 className='font-bold'>{post.description}</h2>
                        <h3 className='text-sm text-gray-900'>{post.title}</h3>  
                        <div className='content' dangerouslySetInnerHTML={{__html:post.content}} />    
                    </Link>
                    )
                })}
            </div>
        )
    };

    if (redirect) {
        return <Navigate to={redirect} />
    }

    if (user) {
        return (
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br/>
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
                <div className='mt-8 gap-x-6 gap-y-8 md:grid lg:grid md:grid-cols-3 lg:grid-cols-4'>
                <p></p>
                {places?.length > 0 && places?.map((post, i ) => {
                    return (
                        <Link to={'/'+post._id} key={i}>
                        <div className='bg-gray-500 mb-2 rounded-2xl flex'>
                            {post.photos?.[0] && (
                                <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/'+post.photos?.[0]} />
                            )}
                        </div>
                        <h2 className='font-bold'>{post.description}</h2>
                        <h3 className='text-sm text-gray-900'>{post.title}</h3>      
                    </Link>
                    )
                })}
            </div>
            </div>
        )
    }
}