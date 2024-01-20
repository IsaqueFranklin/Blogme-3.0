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
        <div className=''>
            <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/'+usuario?.photo} />
            <div>
                <h2>{usuario.username}</h2>
                <h3>{usuario.name}</h3>
                <h3>{usuario.bio}</h3>
            </div>
            {usuario?._id != user?._id ? (
                <button className="success max-w-sm mt-2 mb-8">Seguir</button>
            ) : (
                <div>
                    <a href={'/editar/'+user._id+'/'+user.username}><button className="py-2 px-4 rounded rounded-2xl bg-black text-white max-w-sm mt-2 mb-8 mx-4">Editar perfil</button></a>
                    <a><button className="py-2 px-4 rounded rounded-2xl bg-gray-800 text-white max-w-sm mt-2 mb-8 mx-4">Virar premium</button></a>
                </div>
            )}
        </div>
    )
}