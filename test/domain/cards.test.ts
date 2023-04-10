import { describe, it } from "vitest"
import { CardDescription } from "../../src/domain/types"
import { validUUID, aCard } from "./fixture"
import Cards from '../../src/domain/cards'

describe('Cards', () => {
  const anotherCard: CardDescription = { id: 'another Id', title: 'another card' }

  it('can add a new card', () => {
    const original = new Cards()

    const mutated: Cards = original.addNew()

    const result: CardDescription = mutated.data()[0]
    expect(result.title).toEqual('')
    expect(result.id).toMatch(validUUID)
    expect(mutated).not.toBe(original)
  })

  it('can remove a card', () => {
    const original = new Cards([aCard, anotherCard])

    const mutated: Cards = original.remove(aCard.id)

    const result: Array<CardDescription> = mutated.data()
    expect(result).toEqual([anotherCard])
    expect(mutated).not.toBe(original)
  })

  it('can retrieve a card', () => {
    const original = new Cards([aCard, anotherCard])

    const retrieved: CardDescription = original.retrieve(aCard.id)

    expect(retrieved).toEqual(aCard)
  })

  it('can add a card', () => {
    const original = new Cards([aCard])

    const mutated: Cards = original.add(anotherCard)

    const result: Array<CardDescription> = mutated.data()
    expect(result).toEqual([aCard, anotherCard])
    expect(mutated).not.toBe(original)
  })

  it('can rename a card', () => {
    const original = new Cards([aCard])
    const title = 'new title'

    const mutated: Cards = original.rename(aCard.id, title)

    const result: CardDescription = mutated.data()[0]
    expect(result).toEqual({ ...aCard, title })
    expect(mutated).not.toBe(original)
  })

})