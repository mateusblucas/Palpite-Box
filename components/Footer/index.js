import React from 'react'


const Footer = () => {
  return (
    <div className='bg-gray-500'>
      <div className='container mx-auto'>
        <div className='text-center font-bold text-white p-4'>
          Projeto desenvolvido por Mateus Bordin Lucas
        </div>
        <div className='mx-auto text-center pb-8 '>
          <img className='inline mx-14' style={{ height: 75 }} src='/img/logo_semana_fsm.png' />
          <img className=' inline mx-14' style={{ height: 60 }} src='/img/logo_devpleno.png' />
        </div>
      </div>
    </div>
  )
}

export default Footer