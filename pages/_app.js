// no nextJS, ao criarmos essa página _app.js, ele permite que essa página seria uma página padrão para todas as nossas páginas
import React from 'react'
import '../css/styles.css'
import Layout from '../components/layout'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component{...pageProps} />
    </Layout>
  )
}

export default MyApp