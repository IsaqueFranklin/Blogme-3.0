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
            <img src="" className="" />
            <div>
                <h2>{usuario.username}</h2>
                <h3>{usuario.name}</h3>
            </div>
            <button>Editar perfil</button>
            {usuario?._id != user?._id ? (
                <button>Seguir</button>
            ) : (
                <button>Virar premium</button>
            )}
        </div>
    )
}