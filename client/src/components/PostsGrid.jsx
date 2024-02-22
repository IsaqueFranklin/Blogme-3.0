import {Link} from 'react-router-dom';
import { format } from "date-fns";

export default function PostsGrid({places}) {
    return (
        <div className='mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4'>
                {places?.length > 0 && places?.map((post,i) => {
                    return (
                        <Link to={'/post/'+post._id+'/'+post.title.split(' ').join('-')} key={i}>
                            <div className='bg-gray-500 mb-2 rounded-2xl flex'>
                                {post.photos?.[0] && (
                                    <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/'+post.photos?.[0]} />
                                )}
                            </div>
                            <h2 className='font-bold'>{post.title}</h2>
                            <h3 className='text-sm text-gray-900'>{post.description}</h3> 
                            {/*<div className='content' dangerouslySetInnerHTML={{__html:post.content}} /> */}   
                        </Link>
                    )
                })}
        </div>
    )
}