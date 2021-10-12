import { GoogleSpreadsheet } from 'google-spreadsheet'

//criação de uma instância do GoogleSpreadsheet
const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const fromBase64 = value => {
  const buff = Buffer.from(value, 'base64')
  return buff.toString('ascii')
}

export default async (req, res) => {

  try {
    //await doc.useServiceAccountAuth(credentials)    //como temos a planilha 'doc', vamos autenticar com os dados do crendentials que possui a conta de serviço criada no google 
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
    })
    await doc.loadInfo()                            // aqui pedimos para carragar as informações da planilha

    const sheet = doc.sheetsByIndex[2]              // aqui selecionamos a planilha interna pelo índece mas podemos utilizar outras opções

    await sheet.loadCells('A3:B3')                  //escolhemos a porção da planilha que será carregada

    const mostrarPromocaoCell = sheet.getCell(2, 0)                //pegamos o valor da célula (linha, coluna) e como já carregamos esse valores em sheet, não há necessidade de utilizar o await

    const mensagemPrmocaoCell = sheet.getCell(2, 1)

    res.end(JSON.stringify({
      showMessage: mostrarPromocaoCell.value,
      message: mensagemPrmocaoCell.value
    }))



  } catch (err) {
    res.end(JSON.stringify({
      showMessage: mostrarPromocaoCell.value === 'FALSO',
      message: ''
    }))
  }



}