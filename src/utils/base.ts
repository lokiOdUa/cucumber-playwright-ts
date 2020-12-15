require('dotenv').config()

class Base {
    BASE_URL: string
    BACKEND_URL: string
    INSTANCE_ID: number
    HEADLESS: string
    SCREENSHOTS: string
    app: any
    browserVersion: string
    patientId: string
    patientIdJustCreated: string
    doctorFullName: string
    doctorUserName: string
    responderFullName: string
    responderUserName: string
    tsasFullName: string
    tsasUserName: string
    err: string[]
    resp: any
    scenario: any
    measurement: string[]
    constructor() {
        this.BASE_URL =    process.env.BASE_URL             || 'http://motorhead:3000'
        this.BACKEND_URL = process.env.BACKEND_URL          || 'http://localhost:8080/api/v1'
        this.HEADLESS =    process.env.HEADLESS             || 'true'
        this.INSTANCE_ID = process.env.CUCUMBER_SLAVE_ID ? Number(process.env.CUCUMBER_SLAVE_ID) : 0
        this.SCREENSHOTS = process.env.SCREENSHOTS          || 'true'
        this.app = null
        this.browserVersion = ''
        this.patientId = `aqapatient0`
        this.patientIdJustCreated = ''
        this.doctorFullName = ''
        this.doctorUserName = ''
        this.responderFullName = ''
        this.responderUserName = ''
        this.tsasFullName = ''
        this.tsasUserName = ''
        this.err = [ '' ]
        this.resp = null
        this.scenario = null
        this.measurement = [ ]
        // tslint:disable-next-line:no-console
        // console.log(` *** BASE *** ${this.INSTANCE_ID} *** ${process.env.CUCUMBER_SLAVE_ID}`)
    }
}

const base: Base = new Base()

export { base }
