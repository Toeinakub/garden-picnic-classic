import type { FruitItem } from '../data/fruits'

interface Selection { fruit: FruitItem; quantity: number }
export interface BasketFruitPlacement {
  fruit: FruitItem
  key: string
  x: number
  y: number
  size: number
  rotation: number
  layer: number
}

// A compact preview represents large orders without piling unlimited images over the rim.
export const MAX_VISIBLE_FRUITS = 12

export function getBasketLayout(items: Selection[]): BasketFruitPlacement[] {
  const selected = items.filter(item => item.quantity > 0)
    .slice().sort((a, b) => a.fruit.id.localeCompare(b.fruit.id))
  const total = selected.reduce((sum, item) => sum + item.quantity, 0)
  const count = Math.min(total, MAX_VISIBLE_FRUITS)
  if (!count) return []

  // Include every variety, then apportion remaining slots by its share of the order.
  const copies = selected.map((_, index) => index < count ? 1 : 0)
  for (let used = Math.min(selected.length, count); used < count; used++) {
    let best = -1
    let deficit = -Infinity
    selected.forEach((item, index) => {
      const score = count * item.quantity / total - copies[index]
      if (copies[index] < item.quantity && score > deficit) {
        best = index
        deficit = score
      }
    })
    if (best < 0) break
    copies[best]++
  }

  // Complete, centered rows create a broad base and a narrower crown.
  const rows = count <= 4 ? [count]
    : count <= 9 ? [Math.ceil(count / 2), Math.floor(count / 2)]
    : [5, 4, count - 9]
  const size = count <= 2 ? 28 : count <= 4 ? 25 : 23
  const slots: Omit<BasketFruitPlacement, 'fruit' | 'key'>[] = []
  rows.forEach((length, row) => {
    const spacing = length === 5 ? 14 : 16
    for (let column = 0; column < length; column++) {
      const offset = column - (length - 1) / 2
      slots.push({
        x: 50 + offset * spacing,
        y: 63 - row * 12 + Math.abs(offset) * 1.1,
        size,
        rotation: offset * 3,
        layer: 30 - row * 10 + column
      })
    }
  })

  // Deal varieties across the rows, avoiding runs of the same fruit on one side.
  const fruits: { fruit: FruitItem; key: string }[] = []
  for (let round = 0; fruits.length < count; round++) {
    selected.forEach((item, index) => {
      if (copies[index] > round) fruits.push({ fruit: item.fruit, key: `${item.fruit.id}-${round}` })
    })
  }
  return slots.map((slot, index) => ({ ...slot, ...fruits[index] }))
}
