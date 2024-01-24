import {Link} from 'react-router-dom';

export default function FooterComp() {
  return (
    <footer className="bg-white font-sans text-blackmx-auto text-center my-auto">
            <Link to={'/register'} className='mt-16'><button className="mt-12 py-2 px-6 rounded rounded-lg bg-gray-800 text-white max-w-sm mt-2 mb-4 hover:bg-white hover:text-black">Comece a escrever</button></Link>
            <p className="font-sans p-8 text-black md:text-center md:text-lg md:p-4 mb-12">©Blogme 2024</p>
    </footer>
  );
}
