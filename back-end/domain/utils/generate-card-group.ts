import { randomInt } from 'crypto'

export const generateCardGroup = (): number[] => {
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const selectedItems = []

  for (let i = 0; i < 5; i++) {
    const selectedNumber = randomInt(items.length)

    selectedItems.push(items.splice(selectedNumber, 1)[0])
  }

  return selectedItems
}
