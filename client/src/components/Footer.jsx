import {Link} from 'react-router-dom';

export default function FooterComp() {
  return (
    <footer class="bg-white font-sans text-black border-t mx-auto text-center">
            <Link to={'/register'}><button className="mt-12 py-2 px-6 rounded rounded-lg bg-gray-800 text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black">Crie sua conta</button></Link>
            <p class="font-sans p-8 text-start text-black md:text-center md:text-lg md:p-4 mb-12">© 2023 Blogme</p>
    </footer>
  );
}
