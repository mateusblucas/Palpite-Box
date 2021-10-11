import React, { useState } from 'react'
import PageTitle from '../components/pageTitle'

const Pesquisa = () => {
  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    WhatsApp: '',
    Mensagem: '',
    Nota: 5,
    Indicacao: ''
  })

  const notas = [0, 1, 2, 3, 4, 5]
  const [sucess, setSucess] = useState(false)
  const [retorno, setRetorno] = useState({})

  const save = async () => {

    try {
      //Para enviar para a minha api precisamos usar o fetch que retorna uma respoeta do servidor, usaremos um await por ele ser assíncrono
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form)          //estamos pegando o form e transformando em uma string, para criar um arquivo JSON para ficar como corpo da requisição
      })

      const data = await response.json()
      setSucess(true)
      setRetorno(data)
    } catch (err) {

    }
  }

  const onChange = evt => {                      //Será chamado quadno ouver umamudança no estado do componente e ele será um evento
    const value = evt.target.value               // como esse evento é um evento sintético, não podemos chamar ele diretamente dentro do setForm, por isso precisamos fazer o cashe dele, passando para uma variável antes de entrar no setForm
    const key = evt.target.name
    setForm(old => ({                              // aqui foi aberto parenteses pq queremos retornar um objeto   
      ...old,                                    // pega tudo do vlor antigo e copia
      [key]: value
    }))
    //console.log(evt.target.value)                // o target do evento é o elemnto de onde ele está sendo  chamado, no caso algum input. E o value serve para exibir o valou que está sendo alterado
  }

  return (
    <div>
      <PageTitle title='Pesquisa' />
      <div className='text-center'>
        <h1 className='font-bold ' style={{ fontSize: 24 }}>Críticas e sugestões</h1>
        <p className='font-bold my-6'>O restaurante X sempre busca por atender melhor seus clientes.<br />
          Por isso, estamos sempre abertos a ouvir a sua opinião.</p>
      </div>
      {
        !sucess && <div> <div className='w-96 mx-auto mb-8'>
          <label className='font-bold ' style={{ fontSize: 24 }}>Seu nome:</label>
          <input className='p-4 bg-blue-100 block shadow-2xl w-96 my-2' style={{ borderRadius: '0.75rem', fontSize: 24 }} type='text' placeholder='Nome' onChange={onChange} name='Nome' value={form.Nome} />
        </div>
          <div className='w-96 mx-auto mb-8'>
            <label className='font-bold ' style={{ fontSize: 24 }}>E-mail:</label>
            <input className='p-4 bg-blue-100 block shadow-2xl w-96 my-2' style={{ borderRadius: '0.75rem', fontSize: 24 }} type='text' placeholder='E-mail' onChange={onChange} name='Email' value={form.Email} />
          </div>
          <div className='w-96 mx-auto mb-8'  >
            <label className='font-bold ' style={{ fontSize: 24 }}>WhatsApp:</label>
            <input className='p-4 bg-blue-100 block shadow-2xl w-96 my-2' style={{ borderRadius: '0.75rem', fontSize: 24 }} type='Number' placeholder='WhatsApp' onChange={onChange} name='WhatsApp' value={form.WhatsApp} />
          </div>
          <div className='w-96 mx-auto mb-8'>
            <label className='font-bold ' style={{ fontSize: 24 }}>Sua crítica ou sugestão:</label>
            <input className='p-4 bg-blue-100 block shadow-2xl w-96 my-2' style={{ borderRadius: '0.75rem', fontSize: 24 }} type='text' placeholder='Mensagem' onChange={onChange} name='Mensagem' value={form.Mensagem} />
          </div>
          <div className='w-96 mx-auto mb-8'>
            <label className='font-bold' style={{ fontSize: 24 }}>Que nota você daria para o estabelecimento?</label>
            <div className='flex py-6'>
              {notas.map(nota => {
                return (
                  <label className='block w-2/12 text-center'>
                    <input type='radio' name='Nota' value={nota} onChange={onChange} />
                    <br />
                    {nota}
                  </label>)
              })
              }
            </div>
          </div>

          <h1>Você indicaria para um amigo?</h1>

          <div className='text-center'>
            <button onClick={save} className='bg-blue-400 py-4 px-20 font-bold mx-auto shadow-2xl hover:shadow' style={{ borderRadius: '0.75rem', fontSize: 24 }}>Enviar</button>
          </div>
        </div>
      }

      {
        sucess && <div className='text-center w-1/5 mx-auto'>
          <p className='mb-6 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'>Obrigado por contribuir com a sua opinião.</p>
          {
            retorno.showCupom && <div className='border p-4'>
              Seu cupom de desconto:<br />
              <span className='font-bold text-2xl'>{retorno.Cupom}</span>
            </div>
          }
          {
            retorno.showCupom && <div className='border p-4 my-4'>
              <span className='font-bold text-xl block mb-2'>{retorno.Promo}</span>
              <br />
              <span className='italic'>Tire print e mostre ao garçon.<br />
                Informe seu nome como foi cadastrado na pesquisa.</span>
            </div>
          }
        </div>
      }


    </div >
  )
}

export default Pesquisa