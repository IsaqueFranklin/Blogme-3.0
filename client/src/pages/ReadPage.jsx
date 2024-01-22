import { useEffect, useState, useContext } from "react";
import { useParams, Navigate, Link } from "react-router-dom"
import { UserContext } from '../UserContext';
import axios from 'axios';
import { format } from "date-fns";

export default function ReadPage() {

    const {ready, user, setUser} = useContext(UserContext);

    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [modal, setModal] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return 'merda';
        }

        axios.get('/post/'+id).then(response => {
            setPost(response.data);
        })
    }, [id])

    if (!post) return '';

    async function deletePost(ev) {
        ev.preventDefault();
        if (id) {
            await axios.post('/deletar/', {
                id, ...post
            })
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    if(modal) {
        return (
            <div className="items-center my-auto text-center">
                <h2 className="text-2xl text-[#0047AB] text-center font-semibold mb-8">Tem certeza que deseja deletar a publicação?</h2>
                <button onClick={deletePost} className="m-1 py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Sim</button>
                <button onClick={ev => setModal(false)} className="m-1 py-2 px-4 rounded rounded-lg bg-gray-800 text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Cancelar</button>
            </div>
        )
    }

    return (
        <div className='mt-4 lg:px-8 sm:px-2'>
            {user?._id == post.owner._id ? (
               <div className="">
                    <a href={'/publicar/'+id} className="hover:no-undeline"><button className="m-1 py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Editar</button></a>
                    <button onClick={ev => setModal(true)} className="m-1 py-2 px-4 rounded rounded-lg bg-gray-800 text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Deletar</button>
               </div>

            ) : ('')}
            <div className="mb-6">
                <h1 className='font-[Fira_Sans_Condensed] text-3xl lg:text-5xl font-semibold text-[#131316]'>{post.title}</h1>
                <h2 className='font-normal font-serif  text-lg lg:text-xl md:text-xl mb-6 text-gray-600'>{post.description}</h2>
                <p className="font-semibold">Escrito em {format(new Date(post.dia), 'dd/MM/yyyy')}</p>
                {post.modific ? (
                    <p className="font-semibold">Último modificado em {format(new Date(post.modific), 'dd/MM/yyyy')}</p>
                ) : ''}
            </div>
            <div className='flex'>
                <div className='rounded-2xl overflow-hidden'>
                    <div>
                        {post.photos?.[0] && (
                        <div>
                            <img className='cursor-pointer object-cover' src={'http://localhost:4000/uploads/'+post.photos?.[0]} alt="" />
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="my-10">
                <p className="mb-2">Escrito por:</p>
                <p className="text-xl">{post.owner.name}</p>
                <Link to={'/perfil/'+post.owner.username}><p className="text-[#0047AB] mb-8">@{post.owner.username}</p></Link>
            </div>
            <div className='content text-lg lg:text-xl lg:leading-relaxed leading-normal font-serif text-gray-800' dangerouslySetInnerHTML={{__html:post.content}} />
        </div>
    )
}