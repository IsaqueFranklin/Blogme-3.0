import {useEffect, useState, useContext} from 'react';
import { UserContext } from '../UserContext';
import {Navigate, useParams} from 'react-router-dom';
import PhotosUploader from '../components/PhotosUploader';
import axios from 'axios';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


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

export default function EditProfilePage() {

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [name, setName] = useState('');
    //const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [addedPhoto, setAddedPhoto] = useState('');

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(!id) {
            return;
        }

        axios.get('/edit-profile/'+id).then(response => {
            const {data} = response;
            setName(data.name);
            //setUsername(data.username);
            setAddedPhoto(data.photo);
            setBio(data.bio);
        })
    }, [id])


    if (!ready) {
        return 'Carregando...'
    };

    if (ready && !user) {
        return (
            <Navigate to={'/'} />
        )
    };

    if (user._id != id) {
        return (
            <Navigate to={'/'} />
        )
    };

    async function saveProfile(ev) {
        ev.preventDefault();

        const postData = {
            name, bio, addedPhoto,
        }

        if (id) {
            await axios.put('/edit-profile', {
                id, ...postData
            })
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }


    return (
        <div>
            <form onSubmit={saveProfile}>
                <h2 className='text-2xl mt-4'>Nome</h2>
                <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder='Um título de cair as calças...' />

                <h2 className='text-2xl mt-4'>Bio</h2>
                <input type="text" value={bio} onChange={ev => setBio(ev.target.value)} placeholder='Um descrição de abrir a boca...' /> 

                        <h2 className='text-2xl mt-4'>Fotos de capa</h2>
                        <PhotosUploader addedPhotos={addedPhoto} onChange={setAddedPhoto} />

                        {/*<h2 className='text-2xl mt-4'>Escreva aqui</h2>
                        <ReactQuill
                            value={content} 
                            theme={'snow'}
                            onChange={setContent} 
                            modules={modules} 
                            formats={formats} 
                        />*/}
                        <div className='mb-10'>
                            <button className='primary my-4 mb-20'>Editar perfil</button>
                        </div>
                    </form>
        </div>
    )
}