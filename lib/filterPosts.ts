export const filterByDate = <T extends { date: string }>(item: T[]): T[] =>
  item.filter(({ date }) => new Date(date) <= new Date())
