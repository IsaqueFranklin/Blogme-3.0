import {useEffect, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {

    //Para preenchimento dos formulários.
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(null);

    //Para validação dos dados.
    const [users, setUsers] = useState([]);
    const [repeatedUsername, setRepeatedUsername] = useState(false);
    const [repeatedEmail, setRepeatedEmail] = useState(false);
    const [senhatamanho, setSenhatamanho] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
      axios.get('/users').then(response => {
        setUsers(response.data);
        matchUsername();
        matchEmail();
        senhaTam()
      })
    })

    function matchUsername() {
      users?.map((u) => {
        if (u.username != username) {
          setRepeatedUsername(false);
        } else {
          setRepeatedUsername(true);
          setNoregister(true);
        }
      })
    }

    function matchEmail() {
      users?.map((u) => {
        if (u.email != email) {
          setRepeatedEmail(false);
        } else {
          setRepeatedEmail(true);
          setNoregister(true);
        }
      })
    }

    function senhaTam(){
      if(password.length < 8 && password.length > 0){
        setSenhatamanho(true);
      } else {
        setSenhatamanho(false);
      }
    }

    async function registerUser(ev) {
        ev.preventDefault();
        if(repeatedUsername || repeatedEmail) {
          return;
        } else {
          try {
            await axios.post('/cadastro', {
                name,
                username,
                email,
                password,
            });
            setRedirect('/login')
            
            alert('O cadastro foi bem sucedido, faça seu login novamente.')
          } catch (e) {
              console.log(e);
              alert('O cadastro falhou, tente novamente mais tarde.')
          }
        }
    }

    if (redirect) {
        return (
            <Navigate to={redirect} />
        )
    }

    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          {modal ? (
            <div className="py-2 px-3 text-white bg-[#198320] rounded-2xl justify-center items-center mx-auto my-auto">
              <h2 className="text-xl mx-auto my-auto text-center">Cadastro bem sucedido.</h2>
            </div>
          ) : ''}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Crie a sua conta na Blogme
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={registerUser} className="space-y-6" action="#" method="POST">
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Nome completo
                </label>
                <div className="mt-2">
                  <input
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Seu nome de usuário (username)
                </label>
                <div className="mt-2">
                  <input
                    value={username}
                    onChange={ev => (setUsername(ev.target.value.toLowerCase()))}
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {repeatedUsername ? (
                    <p className='text-primary font-semibold text-sm'>Esse nome de usuário já existe.</p>
                  ) : ''}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Seu melhor email 
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {repeatedEmail ? (
                    <p className='text-primary font-semibold text-sm'>Esse email já existe.</p>
                  ) : ''}
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Senha forte
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-[#0047AB] hover:text-gray-700">
                      Esqueceu a senha?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {senhatamanho ? (
                    <p className='text-primary font-semibold text-sm'>A senha precisa ter no mínimo 8 caracteres.</p>
                  ) : ''}
                </div>
              </div>
  
              <div>
                {repeatedEmail ? (
                  <p className='text-primary font-semibold'>Seu email já existe, por favor escolha outro.</p>
                ) : repeatedUsername ? (
                  <p className='text-primary font-semibold'>Seu username já existe, por favor escolha outro.</p>
                ) : senhatamanho ? (
                  <p className='text-primary font-semibold'>A senha precisa ter no mínimo 8 caracteres.</p>
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#0047AB] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Criar conta
                  </button>
                )}
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Já tem uma conta?{' '}
              <a href="/login" className="font-semibold leading-6 text-[#0047AB] hover:text-gray-700">
                Faça login
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  