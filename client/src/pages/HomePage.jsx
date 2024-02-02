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
                
                <p className="text-[#0047AB] py-2 px-4 border border-[#0047AB] rounded-2xl mt-12">Publicações mais curtidas</p>
                <PostsGrid places={places.filter(place => place.likes.length > 0)} />
                <p className="text-[#0047AB] py-2 px-4 border border-[#0047AB] rounded-2xl mt-12">Publicações mais recentes</p>
                <PostsGrid places={places.filter(place => differenceInCalendarDays(new Date(), new Date(place.dia)) <= 5)} />
                <p className="text-[#0047AB] py-2 px-4 border border-[#0047AB] rounded-2xl mt-12">Publicações de quem você segue</p>
                <PostsGrid 
                    places={
                        places.filter(place => place.owner.followers.includes(user._id))
                    } 
                />
            </div>

        )
    }
}