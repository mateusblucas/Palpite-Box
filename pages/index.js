import React from 'react'
import Link from 'next/link'        //importamos isso pra poder usar link no retorno do componente
import useSWR from 'swr'            // com isso podemos utilizar a mensagem dinânica via tabela do google - isso é um custom hook
import PageTitle from '../components/pageTitle'

//função que passa todos os argumentos para o fetch e quando ele resolve (ele é uma promise), ele retorna um JSON
const fetcher = (...args) => fetch(...args).then(res => res.json())                   //ao usar os "...", nós pegamos cada argumento passado quando chamamos o fetcher e passamos os argumentos para o fetch separados - o fetch é uma promise

//criação de componente para retornar alguam estrutura de tela
const Index = () => {
  const { data, error } = useSWR('api/getPromo', fetcher)                  //o useSWR precisa de uma URL para saber onde que ele vai buscar os dados e como que ele vai bucar os dados, nesse caso com o uso da função fetcher
  return (
    <div>
      <PageTitle title='Home' />
      <p className='mt-24 text-center font-bold'>O restaurante X sempre busca por atender melhor seus clientes.<br />
        Por isso, estamos sempre abertos a ouvir a sua opinião.</p>
      <div className='text-center  m-20 '>
        <Link href='/pesquisa'>
          <a className='bg-blue-400 py-4 px-20 font-bold  shadow-2xl hover:shadow' style={{ borderRadius: '0.75rem', fontSize: 24 }}>
            Dar opinião ou sugestão
          </a>
        </Link>
      </div>
      {!data && <p>Carregando...</p>}
      {!error && data && data.showMessage === 'VERDADEIRO' &&
        <p className='font-bold text-center my-28' >{data.message}</p>
      }
    </div>
  )
}

//--- exportação dos componentes
export default Index