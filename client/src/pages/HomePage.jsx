import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams, Link } from 'react-router-dom';
import {differenceInCalendarDays} from 'date-fns';
import axios from 'axios';
import PostsGrid from '../components/PostsGrid';

export default function HomePage() {

    const {id} = useParams();

    const [redirect, setRedirect] = useState(null);
    const [places, setPlaces] = useState([]);
    const [followPosts, setFollowPosts] = useState([]);
    const [okay, setOkay] = useState([]);

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
        window.location.reload();
    }

    if (!ready) {
        return 'Carregando...'
    };

    if (ready && !user && !redirect) {
        return (
            <div className='mb-16'>
                <p className='text-2xl text-left mt-8'>Publicações mais curtidas</p>
                <PostsGrid places={places.filter(place => place.likes.length > 0)} />
                <p className='text-2xl text-left mt-8'>Publicações mais recentes</p>
                <PostsGrid places={places.filter(place => differenceInCalendarDays(new Date(), new Date(place.dia)) <= 5)} />
            </div>
        )
    };

    if (redirect) {
        return <Navigate to={redirect} />
    }

    if (user) {
        return (
            <div className='text-center mx-auto mb-16'>
                <div className='border border-gray-800 rounded-2xl p-8'>
                    <h2 className='text-2xl font-semibold text-[#0047AB] mb-4'>Bem-vindo, {user.name}!</h2>
                    <h2 className='text-lg'>Logado como {user.name} (@{user.username})</h2>
                    <p className='text-md mb-6'>Leia as melhores publicações de quem você segue! </p>
                    <div className="text-center mx-auto ">
                        <div className='lg:grid lg:grid-cols-3 mx-auto'>
                            <div>
                                <Link>
                                    <button onClick={logout} className="py-2 px-4 rounded rounded-lg bg-gray-800 text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Logout</button>
                                </Link>
                                
                            </div>
                            <div>
                                <Link to={'/perfil/'+user.username}>
                                    <button className='py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black'>Ir ao perfil</button>
                                </Link>
                            </div>
                            <div>
                                <Link to={'/publicar'}>
                                    <button className='py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black'>Fazer publicação</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='text-2xl text-left mt-8'>Publicações mais curtidas</p>
                <PostsGrid places={places.filter(place => place.likes.length > 0)} />
                <p className='text-2xl text-left mt-8'>Publicações mais recentes</p>
                <PostsGrid places={places.filter(place => differenceInCalendarDays(new Date(), new Date(place.dia)) <= 5)} />
                <p className='text-2xl text-left mt-8'>Publicações de quem você segue</p>
                <PostsGrid 
                    places={
                        places.filter(place => place.owner.followers.includes(user._id))
                    } 
                />
            </div>

        )
    }
}