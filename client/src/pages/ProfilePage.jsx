import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ProfilePage() {

    const {username} = useParams();
    const {ready, user, setUser} = useContext(UserContext);

    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        if (!username) {
            return 'merda';
        }

        axios.get('/perfil-externo/'+username).then(response => {
            setUsuario(response.data);
        })
    }, [username])


    if(!usuario) {
        return (
            <div>Carregando...</div>
        )
    }

    return (
        <div className='mt-6 lg:mt-16 border border-gray-800 rounded-2xl'>
            <div className='my-auto p-6 lg:p-16 w-full lg:grid lg:grid-cols-2 text-center lg:text-left gap-16'>
                <div>
                    <img className='rounded-full lg:h-60 lg:w-60 md:h-60 md:w-60 h-48 w-48 mx-auto aspect-square' src={'http://localhost:4000/uploads/'+usuario?.photo[0]} />
                </div>
                <div className='mt-8'>
                    <h3 className='text-2xl'>{usuario.name}</h3>
                    <Link to={'/perfil/'+usuario.username}><h2 className='font-semibold text-[#0047AB] mb-2'>@{usuario.username}</h2></Link>
                    <h3 className='italic mb-4'>{usuario.bio}</h3>
                    {usuario?._id != user?._id ? (
                    <button className="py-2 px-4 rounded rounded-lg bg-gray-800 text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Seguir</button>
                    ) : (
                        <div className=''>
                            <Link to={'/editar/'+user._id+'/'+user.username}><button className="py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white hover:bg-white hover:text-black max-w-sm mx-1 my-1">Editar perfil</button></Link>
                            <Link to={'/premium/'+user._id}><button className="py-2 px-4 rounded rounded-lg bg-gray-900 text-white hover:text-black hover:bg-white max-w-sm mx-1 my-1">Virar premium</button></Link>
                        </div>
                    )}
                </div>
            </div>
            <div className='mx-auto lg:grid lg:grid-cols-3 md:grid md:grid-cols-3 grid grid-cols-2 gap-4 p-6'>
            {usuario?.photo?.length > 0 && usuario.photo.map(photo => (
                        <div className='mx-auto'>
                            <img className='rounded rounded-2xl aspect-square w-32 h-32 md:w-60 md:h-60 lg:w-60 lg:h-60' src={'http://localhost:4000/uploads/'+photo} alt="" />
                        </div>
            ))}       
            </div>
        </div>
    )
}