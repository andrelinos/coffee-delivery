export function getLocalDate(date: string | undefined) {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  try {
    if (date) {
      const currentDate = new Date(date)
      const day = currentDate.getDate()
      const monthIndex = currentDate.getMonth()
      const year = currentDate.getFullYear()

      return `${day} de ${months[monthIndex]} de ${year}`
    }
    return null
  } catch (error) {
    return null
  }
}
