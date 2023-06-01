import { CardDescription, ColumnDescription } from '../../src/domain/types'
import uuid from 'uuid-random'

export const validUUID = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

export const aCard: CardDescription = { id: 'an Id', title: 'a card' }

export function anyId():string{
  return uuid()
}

export const emptyCards:Array<CardDescription>=[]

export const defaultKanbang:Array<ColumnDescription>=[
  {id: anyId(), name: 'to-do',content:emptyCards},
  {id: anyId(), name: 'doing',content:emptyCards},
  {id: anyId(), name: 'done',content:emptyCards}
]