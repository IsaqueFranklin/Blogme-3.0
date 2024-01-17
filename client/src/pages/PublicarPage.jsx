import {useEffect, useState, useContext} from 'react';
import { UserContext } from '../UserContext';
import {Navigate, useParams} from 'react-router-dom';
import PhotosUploader from '../components/PhotosUploader';
import axios from 'axios';

export default function PublicarPage() {

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);


    if (!ready) {
        return 'Carregando...'
    };

    if (ready && !user) {
        return (
            <Navigate to={'/'} />
        )
    };


    return (
        <div>
            <form>
                <h2 className='text-2xl mt-4'>Título da sua publicação</h2>
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

                <h2 className='text-2xl mt-4'>Descrição da sua publicação</h2>
                <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} placeholder='Um descrição de abrir a boca...' /> 

                        <h2 className='text-2xl mt-4'>Fotos de capa</h2>
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                        <h2 className='text-2xl mt-4'>Escreva aqui</h2>
                        <textarea value={content} onChange={ev => setContent(ev.target.value)} />

                        <div className='mb-10'>
                            <button className='primary my-4 mb-20'>Save</button>
                        </div>
                    </form>
        </div>
    )
}