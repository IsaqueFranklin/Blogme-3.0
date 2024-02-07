import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PostsGrid from '../components/PostsGrid';

export default function ProfilePage() {

    const {username} = useParams();
    const {ready, user, setUser} = useContext(UserContext);

    const [usuario, setUsuario] = useState(null)
    const [userFollowing, setUserFollowing] = useState([]);
    const [usuarioFollowers, setUsuarioFollowers] = useState([]);
    const [places, setPlaces] = useState([]);
    const [seguindo, setSeguindo] = useState(false);
    const [following, setFollowing] = useState(false);
    const [emailList, setEmailList] = useState([]);

    const [email, setEmail] = useState('');
    const [inList, setInList] = useState(false);

    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        if (!username) {
            return 'merda';
        }

        axios.get('/perfil-externo/'+username).then(response => {
            setUsuario(response.data);
            setUsuarioFollowers([...response.data.followers]);
            setEmailList([...response.data.emailList]);
            console.log(emailList)
        })
    }, [username])

    useEffect(() => {
        checkFollow();
    }, [userFollowing, usuarioFollowers])

    useEffect(() => {
        if(user){
            setUserFollowing([...user.following]);
        }
    }, [user])

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
        window.location.reload();
    }

    function openPosts(){
        if(usuario){
            axios.get('/posts/'+usuario._id).then(response => {
                setPlaces([...response.data])
            }) 
        }
    }

    async function seguir(ev){
        ev.preventDefault();
        if(user){
            setSeguindo(true);
            userFollowing.push(usuario._id);
            usuarioFollowers.push(user._id);
            emailList.push(user.email);
            console.log(emailList);
            console.log(userFollowing)
            await axios.put('/seguir', {
                usuarioFollowers, userFollowing, emailList, usuario
            })
            window.location.reload();
        }
    }

    async function deseguir(ev){
        ev.preventDefault();
        if(user){
            setSeguindo(false);
            setFollowing(false);
            for(let i = 0; i <= usuarioFollowers.length; i=i+1){
                if(usuarioFollowers[i] === user._id){
                    usuarioFollowers.splice(i, 1);
                    break;
                }
            }

            for(let j=0; j<= userFollowing.length; j=j+1){
                if(userFollowing[j] === usuario._id){
                    userFollowing.splice(j, 1);
                    break;
                }
            }

            for(let f=0; f<= emailList.length; f=f+1){
                if(emailList[f] === user.email){
                    emailList.splice(f, 1);
                    break;
                }
            }

            await axios.put('/seguir', {
                usuarioFollowers, userFollowing, emailList, usuario
            });

        }
    }

    function checkFollow(){
        if(user){
            for(let i = 0; i <= usuarioFollowers.length; i=i+1){
                if(usuarioFollowers[i] === user._id){
                    console.log(usuarioFollowers[i] === user._id)
                    setFollowing(true);
                    break
                }
            }
        }
    }

    async function submitEmail(ev){
        ev.preventDefault();

        await axios.put('/add-email-to-email-list-2', {
            email, ...usuario
        });

        setInList(true);
    }


    if(!usuario) {
        return (
            <div className='mx-auto my-auto'>
                <img className='max-w-32 max-h-32' src='https://i.stack.imgur.com/kOnzy.gif' />
            </div>
        )
    }

    if(!places){
        return (
            <div className='mx-auto my-auto'>
                <img className='max-w-32 max-h-32' src='https://i.stack.imgur.com/kOnzy.gif' />
            </div>
        )
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className='mb-24'>
            {user?._id === usuario?._id ? (
                <div className='border border-gray-800 rounded-2xl p-8 mt-12'>
                    <h2 className='text-2xl font-semibold text-[#0047AB] mb-4'>Bem-vindo, {user.name}!</h2>
                    <h2 className='text-lg'>Logado como {user.name} (@{user.username})</h2>
                    <p className='text-md mb-6'>Leia as melhores publicações de quem você segue! </p>
                    <div className="text-left mx-auto ">
                        <div className='lg:grid lg:grid-cols-3 mx-auto'>
                            <div>
                                <Link to={'/publicar'}>
                                    <button className='py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black'>Fazer publicação</button>
                                </Link>
                            </div>
                            <div>
                                <Link to={'/publicar'}>
                                    <button onClick={logout} className='py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black'>Sair da conta</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : ''}
            <div className='mt-6 lg:mt-16 border border-gray-800 rounded-2xl mb-8'>
                <div className='my-auto p-6 lg:p-16 w-full lg:grid lg:grid-cols-2 text-center lg:text-left gap-16'>
                    <div>
                        <img className='rounded-full lg:h-60 lg:w-60 md:h-60 md:w-60 h-48 w-48 mx-auto aspect-square' src={'http://localhost:4000/uploads/'+usuario?.photo[0]} />
                    </div>
                    <div className='mt-8'>
                        <h3 className='text-2xl'>{usuario.name}</h3>
                        <Link to={'/perfil/'+usuario.username}><h2 className='font-semibold text-[#0047AB] mb-2'>@{usuario.username}</h2></Link>
                        <h3 className='italic mb-4'>{usuario.bio}</h3>
                        {usuario.superUser ? 
                            usuario.instaLink ? 
                                usuario.externLink ? (
                                    <div className='mb-4'>
                                        <Link to={usuario.instaLink}><svg xmlns="http://www.w3.org/2000/svg" height="34" width="31" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></Link>
                                        <Link to={usuario.externLink}><span className='text-sm font-semibold text-[#0047AB]'>{usuario.externLink.split('https://')}</span></Link>
                                    </div>
                                ) : (
                                <div className='mb-4'>
                                    <Link to={usuario.instaLink}><svg xmlns="http://www.w3.org/2000/svg" height="34" width="31" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></Link>
                                </div> 
                            ) : ''
                        : ''}
                        {user ?
                            usuario?._id != user?._id ?
                                seguindo || following ? (
                                    <button onClick={deseguir} className="py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Seguindo</button>
                                ) : (
                                <button onClick={seguir} className="py-2 px-4 rounded rounded-lg bg-gray-800 text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Seguir</button>
                                ) 
                            : (
                                <div className=''>
                                    <Link to={'/editar/'+user._id+'/'+user.username}><button className="py-2 px-4 text-sm lg:text-md rounded rounded-lg bg-[#0047AB] text-white hover:bg-white hover:text-black max-w-sm mx-1 my-1">Editar perfil</button></Link>
                                    <Link to={user?.superUser === true ? '/painel/'+user._id : '/premium/'+user._id}><button className="py-2 px-4 text-sm lg:text-md rounded rounded-lg bg-gray-900 text-white hover:text-black hover:bg-white max-w-sm mx-1 my-1">{user?.superUser === true ? 'Painel de controle' : 'Virar premium'}</button></Link>
                                </div>
                            ) 
                        : ''}
                        {!user ? 
                            usuario.superUser ? 
                                inList ?  (
                                    <div className="my-4 border border-gray-700 rounded-2xl">
                                        <div className="py-4 px-4">
                                            <h2 className="text-xl text-left font-semibold text-[#0047AB]">Você já está inscrito!</h2>
                                            <h2 className="text-left text-md leading-6 text-gray-900">Fique atento à sua caixa de entrada.</h2>
                                        </div>
                                    </div>
                                ) : (
                                <form onSubmit={submitEmail} className="space-y-6 border-t" action="#" method="POST">
                                    <div className="mt-2">
                                        <h2 className="text-md mb-2">Inscreva-se na minha newsletter.</h2>
                                        <div className="">
                                        <input
                                            value={email}
                                            onChange={ev => setEmail(ev.target.value)}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            placeholder="Insira seu melhor email"
                                            className="rounded-2xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        </div>
                                        <button className="mt-2 text-white rounded-lg px-3 py-2 bg-[#0047AB] hover:bg-gray-700">Fazer parte da lista</button>
                                    </div>
                                </form>
                            ) : ''
                        : ''}
                    </div>
                </div>
                {usuario?._id != user?._id ? (
                    <h2 className='text-xl text-center'>Fotos em destaque de {usuario.name}</h2>
                ) : (
                    <h2 className='text-xl text-center'>Suas fotos em destaque</h2>
                )}
                <div className='mx-auto lg:grid lg:grid-cols-3 md:grid md:grid-cols-3 grid grid-cols-3 gap-4 p-6'>
                {usuario?.photo?.length > 0 && usuario.photo.map((photo, key) => (
                            <div className='mx-auto' key={key}>
                                <img className='rounded rounded-2xl aspect-square w-32 h-22 md:w-60 md:h-60 lg:w-60 lg:h-60' src={'http://localhost:4000/uploads/'+photo} alt="" />
                            </div>
                ))}    
                </div>
            </div>
            {places.length > 0 ? (
                <div>
                    <h2 className='text-xl font-semibold'>Publicações mais recentes</h2>
                    <PostsGrid places={places} className='mt-16' />
                </div>
            ) : openPosts()}
        </div>
    )
}