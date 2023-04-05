import Cards from "./cards"

export type CardDescription ={
  id: string,
  title: string
}

export type ColumnDescription ={
  id: string,
  name: string,
  content: Cards
}