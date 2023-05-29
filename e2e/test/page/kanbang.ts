import { Locator, Page } from '@playwright/test'
import * as fs from 'fs'

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
    await this.page.goto('http://kanbang-app:4000')
  }

  public selectColumn(name:string){
    this.selectedColumn = this.page.getByRole('region',{name: name})
  }

  public async addCard(title:string){
    await this.typeInNewcard(title)
    await this.selectedColumn.press('Enter') 
  }

  private async typeInNewcard(title:string){
    await this.selectedColumn.getByRole('menuitem',{name:'add card'}).click()
    await this.selectedColumn.getByRole('textbox').type(title)
  }

  public async addAndEsc(title:string){
    await this.typeInNewcard(title)
    await this.selectedColumn.press('Escape') 
  }

  public getCardByName(name:string):Locator{
    return this.selectedColumn.getByRole('link', { name: name})
  }

  public async import(file:string){
    const fileChooserPromise = this.page.waitForEvent('filechooser')
    await this.page.getByRole('menuitem',{name: 'import'}).click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles(file)
  }

  public async export():Promise<string>{
    const downloadPromise = this.page.waitForEvent('download')
    await this.page.getByRole('menuitem',{name: 'export'}).click()
    const download = await downloadPromise
    const path = await download.path()
    if (!path) return ''
    return fs.readFileSync(path).toString()
  }

}