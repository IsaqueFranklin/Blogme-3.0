import { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom"
import { UserContext } from '../UserContext';
import axios from 'axios';

export default function ReadPage() {

    const {ready, user, setUser} = useContext(UserContext);

    const {id} = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (!id) {
            return 'merda';
        }

        axios.get('/post/'+id).then(response => {
            setPost(response.data);
        })
    }, [id])

    if (!post) return '';

    function editPost() {
        return <Navigate to={'/editar/'+id} />;
    }

    return (
        <div className='mt-4 lg:px-8 sm:px-2 pt-8'>
            {user?._id == post.owner ? (
                <a href={'/editar/'+id} className="hover:no-undeline"><button className="primary max-w-sm mt-2 mb-8">Editar</button></a>
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