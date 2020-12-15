import { base } from '../utils/base'
import { page } from '../utils/page'
const chai = require('chai')
const assert = chai.assert

export class RootPageObject {
  constructor() {}

  public static async ensureNotAvailable(
    selector: string,
    description: string
  ) {
    let isAvailable: boolean = true
    const res = await page.waitForSelector(selector, {
      hidden: true,
      timeout: 3 * 1000,
    })
    if (res === null) {
      // logger.info(` ensureNotAvailable: checking selector ${selector} `)
      isAvailable = false
    }
    assert.isNotTrue(isAvailable, `${description}: ${selector}`)
  }
  public static async getText(
    selector: string,
    description: string
  ): Promise<string> {
    await page.waitForSelector(selector, { timeout: 10000 }).catch((error) => {
      assert.fail(`${description} should be visible`)
    })
    const text = await page.$eval(selector, (e) => e.innerText)
    // logger.info(` *** Got the following text: ${text}`)
    return text
  }
  public static async gotoAndWait(url: string, description: string) {
    try {
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 60 * 1000,
      })
    } catch (err) {
      assert.fail(
        `Not able to open URL: ${url}: ${description} error: ${err.message} ${err.stack}`
      )
    }
  }
  public static async waitFor(selector: string, description: string) {
    await page.waitForSelector(selector, { timeout: 10000 }).catch((error) => {
      assert.fail(`${description} should be visible`)
    })
  }
  // Waits for an element to appear and clicks
  public static async waitForAndClear(selector: string, description: string) {
    await page.waitForSelector(selector, { timeout: 10000 }).catch((error) => {
      assert.fail(`${description} should be visible`)
    })

    const elementHandle = await page.$(selector)
    await elementHandle.click()
    await elementHandle.focus()
    // click three times to select all
    await elementHandle.click({ clickCount: 3 })
    await elementHandle.press('Backspace')
    // await page.click(selector)
    // await page.waitFor(250)
    // await page.keyboard.down('Control')
    // await page.keyboard.press('A')
    // await page.keyboard.up('Control')

    for (let i = 0; i < 5; ++i) {
      await elementHandle.press('Backspace')
    }
    // Clear inputs on mac.
    // await page.$eval(selector, (input) => (input.value = ''))
  }
  // Waits for an element to appear and clicks
  public static async waitForAndClick(selector: string, description: string) {
    await page.waitForSelector(selector, { timeout: 10000 }).catch((error) => {
      assert.fail(`Элемент должен быть видим: ${description}`)
    })
    await page.click(selector)
  }
  // Waits for an element to appear and types message in
  public static async waitForAndType(
    selector: string,
    msg: string,
    description: string
  ) {
    await page.waitForSelector(selector, { timeout: 10000 }).catch((error) => {
      assert.fail(`${description} should be visible`)
    })
    await page.click(selector)
    await page.type(selector, msg)
  }
}
