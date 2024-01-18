import {useEffect, useState, useContext} from 'react';
import { UserContext } from '../UserContext';
import {Navigate, useParams} from 'react-router-dom';
import PhotosUploader from '../components/PhotosUploader';
import axios from 'axios';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default function PublicarPage() {

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);

    const [redirect, setRedirect] = useState(false);


    if (!ready) {
        return 'Carregando...'
    };

    if (ready && !user) {
        return (
            <Navigate to={'/'} />
        )
    };

    async function savePost(ev) {
        ev.preventDefault();

        const postData = {
            title, description, addedPhotos, 
            content, dia:new Date(),
        }

        if (id) {
            await axios.put('/publicar', {
                id, ...postData
            })
            setRedirect(true);
        } else {
            await axios.post('/publicar', {
                ...postData
            });
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }


    return (
        <div>
            <form onSubmit={savePost}>
                <h2 className='text-2xl mt-4'>Título da sua publicação</h2>
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

                <h2 className='text-2xl mt-4'>Descrição da sua publicação</h2>
                <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} placeholder='Um descrição de abrir a boca...' /> 

                        <h2 className='text-2xl mt-4'>Fotos de capa</h2>
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                        <h2 className='text-2xl mt-4'>Escreva aqui</h2>
                        <ReactQuill
                            value={content} 
                            theme={'snow'}
                            onChange={setContent} 
                            modules={modules} 
                            formats={formats} 
                        />
                        <div className='mb-10'>
                            <button className='primary my-4 mb-20'>Save</button>
                        </div>
                    </form>
        </div>
    )
}