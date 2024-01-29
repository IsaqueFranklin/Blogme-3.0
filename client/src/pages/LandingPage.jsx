import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white my-auto mt-8">
      <div className="px-6 lg:px-8">
        <div className="mx-auto py-0 max-w-2xl">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-[#0047AB]">
              Aprenda a criar sua audiência por meio da Blogme (tutorial).{' '}
              <a href="#" className="font-semibold text-[#0047AB]">
                <span className="absolute inset-0" aria-hidden="true" />
                Ler mais <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Escreva e crie sua audiência.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/register"
                className="rounded-md bg-[#0047AB] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Criar conta
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Ler tutorial <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-24 py-16 mx-auto'>
          <h2 className='text-xl text-center lg:text-2xl font-bold tracking-tight text-gray-900 mb-8'>Por que criar uma audiência por meio de artigos</h2>
          <div className='lg:grid lg:grid-cols-2 border border-[#0047AB] rounded-2xl p-8 mt-4 text-left gap-8'>
            <div>
              <h2 className='text-lg lg:text-xl font-semibold tracking-tight text-gray-900'>Por que criar uma audiência por meio de artigos</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
            </div>
            <div className='mt-6 lg:mt-0'>
              <img className='rounded-2xl' src='https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
          </div>

          <div className='lg:grid lg:grid-cols-2 border border-[#0047AB] rounded-2xl p-8 mt-12 text-left gap-8'>
            <div className='mt-6 lg:mt-0'>
              <img className='rounded-2xl' src='https://plus.unsplash.com/premium_photo-1665329006985-04f95dd59402?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
            <div>
              <h2 className='text-lg lg:text-xl font-semibold tracking-tight text-gray-900'>Por que criar uma audiência por meio de artigos</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
            </div>
          </div>
      </div>
    </div>
  )
}
