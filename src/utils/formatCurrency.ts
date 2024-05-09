export function formatCurrency(value: number) {
  try {
    const currency = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    return currency || 'R$0,00'
  } catch (error) {
    return 'R$0,00'
  }
}
