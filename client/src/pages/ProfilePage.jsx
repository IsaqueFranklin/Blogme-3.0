import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PostsGrid from '../components/PostsGrid';

export default function ProfilePage() {

    const {username} = useParams();
    const {ready, user, setUser} = useContext(UserContext);

    const [usuario, setUsuario] = useState(null)
    const [userFollowing, setUserFollowing] = useState([]);
    const [usuarioFollowers, setUsuarioFollowers] = useState([]);
    const [places, setPlaces] = useState([]);
    const [seguindo, setSeguindo] = useState(false);

    useEffect(() => {
        if (!username) {
            return 'merda';
        }

        axios.get('/perfil-externo/'+username).then(response => {
            setUsuario(response.data);
            setUsuarioFollowers([...response.data.followers]);
        })
    }, [username])

    function openPosts(){
        if(usuario){
            axios.get('/posts/'+usuario._id).then(response => {
                setPlaces([...response.data])
            }) 
        }
    }

    async function seguir(ev){
        ev.preventDefault();
        setSeguindo(true);
        if(user){
            if(user.following){
                setUserFollowing(...user.following);
                userFollowing.push(usuario._id);
            } else {
                userFollowing.push(usuario._id);
            }
            usuarioFollowers.push(user._id);
            await axios.post('/seguir', {
                usuarioFollowers, userFollowing, usuario
            })
        }
    }


    if(!usuario) {
        return (
            <div className='mx-auto my-auto'>
                <img className='max-w-32 max-h-32' src='https://i.stack.imgur.com/kOnzy.gif' />
            </div>
        )
    }

    if(!places){
        return (
            <div className='mx-auto my-auto'>
                <img className='max-w-32 max-h-32' src='https://i.stack.imgur.com/kOnzy.gif' />
            </div>
        )
    }


    return (
        <div className='mb-24'>
            <div className='mt-6 lg:mt-16 border border-gray-800 rounded-2xl mb-8'>
                <div className='my-auto p-6 lg:p-16 w-full lg:grid lg:grid-cols-2 text-center lg:text-left gap-16'>
                    <div>
                        <img className='rounded-full lg:h-60 lg:w-60 md:h-60 md:w-60 h-48 w-48 mx-auto aspect-square' src={'http://localhost:4000/uploads/'+usuario?.photo[0]} />
                    </div>
                    <div className='mt-8'>
                        <h3 className='text-2xl'>{usuario.name}</h3>
                        <Link to={'/perfil/'+usuario.username}><h2 className='font-semibold text-[#0047AB] mb-2'>@{usuario.username}</h2></Link>
                        <h3 className='italic mb-4'>{usuario.bio}</h3>
                        {usuario?._id != user?._id ? 
                            seguindo ? (
                                <button onClick={seguir} className="py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Seguindo</button>
                            ) : (
                                <button onClick={seguir} className="py-2 px-4 rounded rounded-lg bg-gray-800 text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Seguir</button>
                        ) : (
                            <div className=''>
                                <Link to={'/editar/'+user._id+'/'+user.username}><button className="py-2 px-4 text-sm lg:text-md rounded rounded-lg bg-[#0047AB] text-white hover:bg-white hover:text-black max-w-sm mx-1 my-1">Editar perfil</button></Link>
                                <Link to={'/premium/'+user._id}><button className="py-2 px-4 text-sm lg:text-md rounded rounded-lg bg-gray-900 text-white hover:text-black hover:bg-white max-w-sm mx-1 my-1">Virar premium</button></Link>
                            </div>
                        )}
                    </div>
                </div>
                {usuario?._id != user?._id ? (
                    <h2 className='text-xl text-center'>Fotos em destaque de {usuario.name}</h2>
                ) : (
                    <h2 className='text-xl text-center'>Suas fotos em destaque</h2>
                )}
                <div className='mx-auto lg:grid lg:grid-cols-3 md:grid md:grid-cols-3 grid grid-cols-3 gap-4 p-6'>
                {usuario?.photo?.length > 0 && usuario.photo.map((photo, key) => (
                            <div className='mx-auto' key={key}>
                                <img className='rounded rounded-2xl aspect-square w-32 h-22 md:w-60 md:h-60 lg:w-60 lg:h-60' src={'http://localhost:4000/uploads/'+photo} alt="" />
                            </div>
                ))}    
                </div>
            </div>
            {places.length > 0 ? (
                <div>
                    <h2 className='text-xl font-semibold'>Publicações mais recentes</h2>
                    <PostsGrid places={places} className='mt-16' />
                </div>
            ) : openPosts()}
        </div>
    )
}