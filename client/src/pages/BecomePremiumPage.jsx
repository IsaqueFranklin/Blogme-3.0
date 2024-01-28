import {useState, useEffect, useContext} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function BecomePremiumPage(){

    const {ready, user, setUser} = useContext(UserContext);

    const {id} = useParams();

    if(user){
        return (
            <div className='mx-auto my-auto'>
                <h2 className='text-2xl'>Está funcionando!</h2>
            </div>
        )
    } else {
        return <Navigate to={'/register'}/>
    }
}