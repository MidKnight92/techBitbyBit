export const filterByDate = <T extends { date: string }>(item: T[]): T[] =>
  item.filter(({ date }) => new Date(date).getTime() <= new Date().getTime())
