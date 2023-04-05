import { ColumnDescription } from "./types";

export default class Columns{
  collection: Array<ColumnDescription>

  constructor(data?:Array<ColumnDescription>){
    this.collection = Array.from(data || [])
  }

  data():Array<ColumnDescription>{
    return this.collection
  }
}