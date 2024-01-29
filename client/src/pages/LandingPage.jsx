import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const includedFeatures = [


  'Private forum access',
  'Member resources',
  'Entry to annual conference',
  'Official member t-shirt',
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
            <div>
              <img className='rounded-2xl' src='https://plus.unsplash.com/premium_photo-1665329006985-04f95dd59402?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
            <div className='mt-6 lg:mt-0'>
              <h2 className='text-lg lg:text-xl font-semibold tracking-tight text-gray-900'>Por que criar uma audiência por meio de artigos</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
            </div>
          </div>
      </div>

      <div className="mb-12">
      <div className="mx-auto max-w-7xl px-2 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Comece pelo plano gratuito</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 mb-8">
            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas
            in. Explicabo id ut laborum.
          </p>
          <Link to={'/register'} className='mt-16'><button className="mt-16 py-2 px-6 rounded rounded-lg bg-gray-800 text-white max-w-sm mt-2 mb-4 hover:bg-white hover:text-black">Crie sua conta gratuita</button></Link>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Assinatura da Blogme Pro</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
              repellendus etur quidem assumenda.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-[#0047AB]">O que o plano PRO inclui?</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-2 lg:mt-0 lg:w-full lg:max-w-md">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-24">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Assine o plano Blogme PRO</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-3xl font-bold tracking-tight text-gray-900">R$29,90/mês</span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-[#0047AB] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Assinar agora
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
