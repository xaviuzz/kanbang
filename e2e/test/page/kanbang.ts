import { Locator, Page } from '@playwright/test'
import * as fs from 'fs'

export default class Kanbang {
  private page: Page

  public static async go(page: Page, board = '') {
    const thePage = new Kanbang(page)
    await thePage.open(board)
    return thePage
  }

  private constructor(page: Page) {
    this.page = page
  }

  private async open(board: string) {
    let url = 'http://kanbang-app:4000'
    if (board) url = url + '/' + board
    await this.page.goto(url)
  }

  public title() {
    return this.page.getByRole('banner').getByRole('heading')
  }

  public async addCardToColumn(title: string, columnName: string) {
    const theColumn = this.getColumn(columnName)
    await this.clickAndType(theColumn, title)
    await theColumn.press('Enter')
  }

  public getCardInColumn(title: string, columnName: string) {
    const theColumn = this.getColumn(columnName)
    return theColumn.getByRole('link', { name: title })
  }

  public async addAndEsc(title: string, columnName: string) {
    const theColumn = this.getColumn(columnName)
    await this.clickAndType(theColumn, title)
    await theColumn.press('Escape')
  }

  private async clickAndType(column: Locator, title: string) {
    await column.getByRole('menuitem', { name: 'add card' }).click()
    await column.getByRole('textbox').type(title)
  }

  private getColumn(columnName:string):Locator{
    return this.page.getByRole('region', { name: columnName })
  }

  public async deleteCard(title: string) {
    const card = this.getCard(title)
    await this.clickOnCard(card,'delete')
  }

  public async moveCardForward(title: string) {
    const card = this.getCard(title)
    await this.clickOnCard(card,'forward')
  }

  public async moveCardBackward(title: string) {
    const card = this.getCard(title)
    await this.clickOnCard(card,'backward')
  }

  private async clickOnCard(card:Locator,buttonName:string){
    await card
      .getByRole('button', { name: buttonName })
      .click()
  }

  private getCard(title:string):Locator{
    return this.page.getByRole('link', { name: title })
  }

  public async import(file: string) {
    const fileChooserPromise = this.page.waitForEvent('filechooser')
    await this.page.getByRole('menuitem', { name: 'import' }).click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles(file)
  }

  public async export(): Promise<string> {
    const downloadPromise = this.page.waitForEvent('download')
    await this.page.getByRole('menuitem', { name: 'export' }).click()
    const download = await downloadPromise
    const path = await download.path()
    if (!path) return ''
    return fs.readFileSync(path).toString()
  }

}