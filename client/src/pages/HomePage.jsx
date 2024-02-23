import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams, Link } from 'react-router-dom';
import {differenceInCalendarDays} from 'date-fns';
import axios from 'axios';
import PostsGrid from '../components/PostsGrid';
import { format } from "date-fns";


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

    if (!ready) {
        return 'Carregando...'
    };

    if (ready && !user && !redirect) {
        return (
            <div className='mb-16'>
                <p className="text-[#0047AB] py-2 px-4 border border-[#0047AB] rounded-2xl mt-12">Publicações em destaque</p>
                <div className='lg:grid lg:grid-cols-3 gap-6 mt-8'>
                        {places?.length > 0 && places?.slice(0,3).map((post, i) => {
                                return (
                                    <div className='border border-[#0047AB] rounded-2xl p-4 text-left mt-4' key={i}>
                                    <Link to={'/post/'+post._id+'/'+post.title}>
                                        
                                            <div className='flex mb-4'>
                                                <img key={i}
                                                    src={import.meta.env.VITE_API_BASE_URL+'/uploads/'+post.photos[0]}
                                                    alt="image"
                                                    className="object-cover aspect-square rounded-2xl"
                                                />
                                            </div>
                                            <h2 className='mb-2'>{post.title}</h2>
                                            <h3 className='text-sm text-gray-700 mb-2'>{post.description}</h3> 
                                            <p className="text-sm">Escrito por @{post.owner?.username} em {format(new Date(post.dia), 'dd/MM/yyyy')}</p>
                                        
                                    </Link>
                                    </div>
                                )
                        })}

                </div>
                <p className="text-[#0047AB] py-2 px-4 border border-[#0047AB] rounded-2xl mt-12">Publicações mais curtidas</p>
                <PostsGrid places={places.filter(place => place.likes.length > 0)} />
                <p className="text-[#0047AB] py-2 px-4 border border-[#0047AB] rounded-2xl mt-12">Publicações mais recentes</p>
                <PostsGrid places={places.filter(place => differenceInCalendarDays(new Date(), new Date(place.dia)) <= 5)} />
            </div>
        )
    };

    if (redirect) {
        return <Navigate to={redirect} />
    }

    if (user) {
        return (
                <div className='mx-auto mb-16'>
                <p className="text-[#0047AB] py-2 px-4 border border-[#0047AB] rounded-2xl mt-12">Publicações em destaque</p>
                <div className='lg:grid lg:grid-cols-3 gap-6 mt-8'>
                        {places?.length > 0 && places?.slice(0,3).map((post, i) => {
                                return (
                                    <div className='border border-[#0047AB] rounded-2xl p-4 text-left mt-4' key={i}>
                                    <Link to={'/post/'+post._id+'/'+post.title}>
                                        
                                            <div className='flex mb-4' key={i}>
                                                <img 
                                                    src={import.meta.env.VITE_API_BASE_URL+'/uploads/'+post.photos[0]}
                                                    alt="image"
                                                    className="object-cover aspect-square rounded-2xl"
                                                />
                                            </div>
                                            <h2 className='mb-2'>{post.title}</h2>
                                            <h3 className='text-sm text-gray-700 mb-2'>{post.description}</h3> 
                                            <p className="text-sm">Escrito por @{post.owner?.username} em {format(new Date(post.dia), 'dd/MM/yyyy')}</p>
                                                                                    
                                    </Link>
                                    </div>
                                )
                        })}

                </div>
                <p className="text-[#0047AB] py-2 px-4 border border-[#0047AB] rounded-2xl mt-12">Publicações mais curtidas</p>
                <PostsGrid places={places.filter(place => place.likes.length > 0)} />
                <p className="text-[#0047AB] py-2 px-4 border border-[#0047AB] rounded-2xl mt-12">Publicações mais recentes</p>
                <PostsGrid places={places.filter(place => differenceInCalendarDays(new Date(), new Date(place.dia)) <= 5)} />
                <p className="text-[#0047AB] py-2 px-4 border border-[#0047AB] rounded-2xl mt-12">Publicações de quem você segue</p>
                <PostsGrid 
                    places={
                        places.filter(place => place.owner?.followers.includes(user._id))
                    } 
                />
            </div>

        )
    }
}