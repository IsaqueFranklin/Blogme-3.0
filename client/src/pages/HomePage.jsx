import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function HomePage() {

    const [redirect, setRedirect] = useState(null);

    const {ready, user, setUser} = useContext(UserContext);

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'Carregando...'
    };

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    };

    if (redirect) {
        return <Navigate to={redirect} />
    }

    if (user) {
        return (
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br/>
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            </div>
        )
    }

    return (
        <div>Home Page!</div>
    )
}