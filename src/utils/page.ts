const { BeforeAll, AfterAll } = require('cucumber')
import playwright = require('playwright')
require('dotenv').config()
import { After, Before, Status } from 'cucumber'
import { logger } from './logger'
import { base } from './base'
let browser: any
let context: any
let page: any

const screenshotsPrefix = `${__dirname}/../../reports`

BeforeAll({ timeout: 60 * 1000 }, async () => {
  browser = await playwright.chromium.launch()
  context = await browser.newContext()
  page = await context.newPage()
  await page.setViewportSize({
    width: 1650,
    height: 950
  })
})

Before((scenario: any) => {
  base.scenario = scenario
  logger.info(` *** Executing ${base.scenario.pickle.name} on instance ${base.INSTANCE_ID}`)
})

AfterAll({ timeout: 60 * 1000 }, async () => {
  // await page.close()
  await browser.close()
  // tslint:disable-next-line:no-console
  // console.log(JSON.stringify(base.err))
  // logger.info(` *** page AfterAll`)
})

if (base.SCREENSHOTS) {
  After(async (scenario) => {
    // logger.info(` *** Will create screenshots in ${screenshotsPrefix} *** `)
    // logger.info(` *** Got control After()! *** `)
    // logger.info(JSON.stringify(scenario))
    // logger.info(` *** ${scenario.result.status} *** `)
    if (scenario.result.status === Status.FAILED) {
      // screenShot is a base-64 encoded PNG
      // const screenShot = await page.screenshot()
      const screenshotFileName = `${screenshotsPrefix}/${scenario.pickle.name
        .split(' ')
        .join('_')}_${Date.now()}.png`
      await page.screenshot({ path: screenshotFileName })
      // logger.info(` *** Creating screenshot on failed scenario! ${screenshotFileName} *** `)
    }
  })
}
export { page }
