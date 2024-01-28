import {Link} from 'react-router-dom';
import {useEffect, useContext, useState} from 'react';
import { UserContext } from '../UserContext';

export default function FooterComp() {

  const {ready, user, setUser} = useContext(UserContext);

  if(!user) {
    return (
      <footer className="bg-white font-sans text-blackmx-auto text-center my-auto">
        <Link to={'/register'} className='mt-16'><button className="mt-12 py-2 px-6 rounded rounded-lg bg-gray-800 text-white max-w-sm mt-2 mb-4 hover:bg-white hover:text-black">Comece a escrever</button></Link>
        <p className="font-sans p-8 text-black md:text-center md:text-lg md:p-4 mb-12">©Blogme 2024</p>
      </footer>
    );
  } 

  if(user.superUser === false){
    return (
      <footer className="bg-white font-sans text-blackmx-auto text-center my-auto">
        <Link to={'/premium/'+user._id} className='mt-16'><button className="mt-12 py-2 px-6 rounded rounded-lg bg-[#117118] text-white max-w-sm mt-2 mb-4 hover:bg-white hover:text-black">Torne-se premium</button></Link>
        <p className="font-sans p-8 text-black md:text-center md:text-lg md:p-4 mb-12">©Blogme 2024</p>
      </footer>
    );
  } else {
    return (
      <footer className="bg-white font-sans text-blackmx-auto text-center my-auto">
        <p className="font-sans p-8 text-black md:text-center md:text-lg md:p-4 mb-12">©Blogme 2024</p>
      </footer>
    )
  }
}
