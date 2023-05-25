import { Locator, Page } from '@playwright/test'

export default class Kanbang {
  private page:Page
  private selectedColumn:Locator

  public static async go(page:Page){
    const thePage = new Kanbang(page)
    await thePage.open()
    return thePage
  }

  private constructor(page:Page){
    this.page = page
  }

  private async open(){
    await this.page.goto('http://localhost:4000')
  }

  public selectColumn(name:string){
    this.selectedColumn = this.page.getByRole('region',{name: name})
  }

  public async addCard(title:string){
    await this.selectedColumn.getByRole('menuitem',{name:'add card'}).click()
    await this.selectedColumn.getByRole('textbox').type(title)
    await this.selectedColumn.press('Enter') 
  }

  public getCardByName(name:string):Locator{
    return this.selectedColumn.getByRole('link', { name: name})
  }

}