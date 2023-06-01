export type ColumnDescription = {
  id: string,
  name: string,
  content: Array<CardDescription>
}

export type BoardDescription = Array<ColumnDescription>

export type CardDescription = {
  id: string,
  title: string
}