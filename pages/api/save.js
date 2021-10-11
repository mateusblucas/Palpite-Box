import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'

//criação de uma instância do GoogleSpreadsheet
const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

// geração do cupom da promoção
const genCupom = () => {
  const code = parseInt(moment().format('DDHHYYmmMMssSSS')).toString(16).toUpperCase()
  return code.substr(0, 4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4)
}


export default async (req, res) => {

  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: process.env.SHEET_PRIVATE_KEY
    })
    await doc.loadInfo()                            // aqui pedimos para carragar as informações da planilha

    const sheet = doc.sheetsByIndex[1]
    const data = JSON.parse(req.body)

    const sheetConfig = doc.sheetsByIndex[2]              // aqui selecionamos a planilha interna pelo índece mas podemos utilizar outras opções
    await sheetConfig.loadCells('A3:B3')                  //escolhemos a porção da planilha que será carregada

    const mostrarPromocaoCell = sheetConfig.getCell(2, 0)                //pegamos o valor da célula (linha, coluna) e como já carregamos esse valores em sheet, não há necessidade de utilizar o await
    const mensagemPrmocaoCell = sheetConfig.getCell(2, 1)

    let Cupom = ''
    let Promo = ''

    if (mostrarPromocaoCell.value === 'VERDADEIRO') {
      Cupom = genCupom()
      Promo = mensagemPrmocaoCell.value
    }


    //Nome	E-mail	WhatsApp	Cupom	Promo             //esses são apenas os headers da planilha como referência
    await sheet.addRow({                            //como nossa planilha possui o header, podemos usar isso como key
      Nome: data.Nome,
      'E-mail': data.Email,
      WhatsApp: data.WhatsApp,
      Nota: parseInt(data.Nota),
      Cupom,
      Promo,
      'Data Preenchido': moment().format('DD/MM/YYYY, h:mm:ss a')                 // Formato de data utilizando o moment.js
    })
    res.end(JSON.stringify({
      showCupom: Cupom !== '',                    //Se o cupom não estiver vazio, vai fazer o cupom e a mensagem
      Cupom,
      Promo
    }))

  } catch (err) {
    console.log(err)
    res.end('error')
  }


}