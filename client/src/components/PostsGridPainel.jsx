import {useState, useEffect, useContext} from 'react';
import {Navigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function PostsGridPainel({places}) {

    return (
        <>
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
                                <button className="m-1 py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Enviar email com post</button>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </>
    )
}