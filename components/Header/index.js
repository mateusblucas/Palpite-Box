import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

const Header = () => {
  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <div className='container mx-auto'>
          <Link href='/'>
            <a><img className='mx-auto' src='/img/logo_palpitebox.png' alt='PalpiteBox' style={{ height: 120 }} /></a>
          </Link>
        </div>
      </div>
      <div className='bg-gray-400 p-2 shadow-md text-center mb-14'>
        <Link href='/sobre'>
          <a className='px-8 hover:underline'>Sobre</a>
        </Link>
        <Link href='/contato'>
          <a className='px-8 hover:underline'>Contato</a>
        </Link>
      </div>
    </React.Fragment>)
}

export default Header