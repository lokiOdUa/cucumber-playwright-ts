import { logger } from '../../utils/logger'
import { page } from '../../utils/page'
import { RootPageObject } from '../RootPageObject'

export class IndexPage extends RootPageObject {
  constructor() { super() }

  // 1. That all starts with getting selectors
  static LINK_SELECTOR = "//a"
  static CATALOG_LINKS_SELECTOR = "a[href^=\"/actions/Catalog.action\"]"

  // 2. Passive receiving data
  public static async getLinkText(): Promise<string> {
    return await page.$eval(this.LINK_SELECTOR, e => e.innerText)
  }
  public static async getNumberOfCatalogLinks(): Promise<number> {
    return(Number((await page.$$(this.CATALOG_LINKS_SELECTOR)).length))
  }

  // 3. Methods for actual actions
  public static async clickLink() {
    await this.waitForAndClick(this.LINK_SELECTOR, "Ссылка с главной страницы сайта")
  }
}
