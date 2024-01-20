import { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom"
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
            <div>
                <h2>Tem certeza que deseja deletar a publicação?</h2>
                <button onClick={deletePost} className="primary max-w-sm mt-2 mb-8">Sim</button>
                <button onClick={ev => setModal(false)} className="primary max-w-sm mt-2 mb-8">Cancelar</button>
            </div>
        )
    }

    return (
        <div className='mt-4 lg:px-8 sm:px-2 pt-8'>
            <p className="">{post.owner.name}</p>
            <p className="">Escrito em {format(new Date(post.dia), 'dd/MM/yyyy')}</p>
            {/*<p className="">Último modificado em {format(new Date(post.modific), 'dd/MM/yyyy')}</p>*/}
            {user?._id == post.owner._id ? (
               <div>
                    <a href={'/publicar/'+id} className="hover:no-undeline"><button className="primary max-w-sm mt-2 mb-8">Editar</button></a>
                    <button onClick={ev => setModal(true)} className="primary max-w-sm mt-2 mb-8">Deletar</button>
               </div>

            ) : ('')}
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
                <h1 className='text-3xl'>{post.title}</h1>
                <h2 className='font-normal text-xl'>{post.description}</h2>
            </div>
            <div className='content' dangerouslySetInnerHTML={{__html:post.content}} />
        </div>
    )
}