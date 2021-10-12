//conversão para base 64 - utilizada para compatibilizar variáveis locais com o versel
export const fromBase64 = value => {
  const buff = Buffer.from(value, 'base64')
  return buff.toString('ascii')
}

export default fromBase64