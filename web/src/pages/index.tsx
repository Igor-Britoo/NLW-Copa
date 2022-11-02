import Image from 'next/image'
import appPreviewImage from '../assets/app-nlw-copa-preview.png'
import logoImage from '../assets/logo.svg'
import usersAvatarExampleImage from '../assets/users-avatar-example.png'
import iconCheckImage from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps {
  poolsCount: number,
  guessesCount: number,
  usersCount: number
}

function SystemData({info, count}){
  return(
    <div className='flex items-center gap-6'>
      <Image src={iconCheckImage} alt=""/>
      <div className='flex flex-col'>
        <span className='text-2xl font-bold'>+ {count}</span>
        <span>{info}</span>
      </div>
    </div>
  )
}

export default function Home(props:HomeProps) {

  const [poolTitle, setPooltitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()

    await api.post('/pools', {
      title: poolTitle
    })
    .then(async response => {
      const {code} = response.data.pool
      await navigator.clipboard.writeText(code)
      alert('Bolão criado com sucesso, o código foi copiado para área de transferência!')
      setPooltitle('')

    }).catch(error =>{
      console.log(error)
      alert('Falha ao criar o bolão, tente novamente!')
    })
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28' >
      <main>

        <Image src={logoImage} alt="NLW Copa"/>

        <h1 className='mt-14 text-5xl text-white font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2' >
          <Image src={usersAvatarExampleImage} alt=""/>

          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+ {props.usersCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input 
            type="text" 
            required 
            placeholder="Qual nome do seu bolão?"
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
            onChange={event => setPooltitle(event.target.value)}
            value={poolTitle}
          />
          <button 
            type="submit" 
            className='px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'>

            Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className='flex justify-between mt-10 pt-10 border-t border-gray-600 text-gray-100'>
          <SystemData info={'Bolões criados'} count={props.poolsCount} />
          <div className='w-px h-14 bg-gray-600'></div>
          <SystemData info={'Palpites Enviados'} count={props.guessesCount} />
        </div>

      </main>

      <Image 
        src={appPreviewImage} 
        alt="Dois celulares exibindo uma prévisa da aplicação móvel NLW Copa"
        quality={100}
      />
    </div>
  )
}

export const getServerSideProps = async() =>{

  const [
    poolsCountResponse,
    guessesCountResponse, 
    usersCountResponse

  ] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count'),
  ])

  return {
    props: {
      poolsCount: poolsCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      usersCount: usersCountResponse.data.count
    }
  }
}
