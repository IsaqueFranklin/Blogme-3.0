import {useState, useEffect, useContext} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function PainelPage(){

    const {ready, user, setUser} = useContext(UserContext);

    const {id} = useParams();

    async function enviarEmail(ev){
        ev.preventDefault();

        await axios.post('/enviar-email-teste', {
            
        })
    }

    if(user?.superUser === true){
        return (
            <div className='mx-auto my-auto'>
                <h2 className='text-2xl'>Está funcionando!</h2>
                <button onClick={enviarEmail}>Enviar email</button>
            </div>
        )
    } else {
        return <Navigate to={'/'}/>
    }
}