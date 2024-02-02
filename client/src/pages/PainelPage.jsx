import {useState, useEffect, useContext} from 'react';
import {Navigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import PostsGrid from '../components/PostsGrid';
import PostsGridPainel from '../components/PostsGridPainel';

export default function PainelPage(){

    const {ready, user, setUser} = useContext(UserContext);

    const {id} = useParams();
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        if(user){
            axios.get('/posts/'+user._id).then(response => {
                setPlaces([...response.data])
            }) 
        }
    }, [])

    async function enviarEmail(poste){
        await axios.post('/enviar-email-teste', {
            poste
        })
    }

    if(user?.superUser === true){
        return (
            <div className='mx-auto my-auto'>
                <div className='border border-gray-800 rounded-2xl p-8 my-8'>
                    <h2 className='text-2xl font-semibold text-[#0047AB] mb-4'>Bem-vindo, {user.name}!</h2>
                    <h2 className='text-lg'>Logado como {user.name} (@{user.username})</h2>
                    <p className='text-md mb-6'>Leia as melhores publicações de quem você segue! </p>
                    <div className="text-left">
                        <div className='lg:grid lg:grid-cols-3'>
                            <div>
                                <Link to={'/editar/'+user._id+'/'+user.username}>
                                    <button className='py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black'>Edição PRO do seu perfil</button>
                                </Link>
                            </div>
                            <div>
                                <Link to={'/publicar'}>
                                    <button className='py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black'>Criar landing page</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='text-2xl'>Painel de controle das Newsletters</h2>                
                    {places?.length > 0 && places?.filter(us => us.enviado === false).map((post,i) => {

                        return (
                            <Link to={'/post/'+post._id+'/'+post.title.split(' ').join('-')} key={i}>
                                <div className='mt-8 flex'>
                                    <div className=''>
                                        {post.photos?.[0] && (
                                            <img className='rounded-2xl w-full h-32 aspect-square' src={'http://localhost:4000/uploads/'+post.photos?.[0]} />
                                        )}
                                    </div>
                                    <div className='mx-4 my-auto'>
                                        <h2 className='font-bold'>{post.title}</h2>
                                        <h3 className='text-sm text-gray-900'>{post.description}</h3> 
                                        <Link to={'/post/'+post._id+'/'+post.title.split(' ').join('-')} key={i}><button className="m-1 py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Enviar newsletter</button></Link>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                {places.length > 0 ? (
                    <div className='mt-12'>
                        <h2 className='text-xl'>Publicações já enviadas</h2>
                        <PostsGrid places={places.filter(us => us.enviado === true)} className='mt-16' />
                    </div>
                ) : ''}
            </div>
        )
    } else {
        return <Navigate to={'/'}/>
    }
}