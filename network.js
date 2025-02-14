import { browser, networkProfiles } from 'k6/experimental/browser';


export const options={
    scenarios:{
        browser_test:{
            executor: 'constant-vus',
            vus:2,
            duration: '30s',
            options: {
                browser: {
                    type: 'chromium'
                }
            }
        }
    }
}


export default async function () {
    const page = browser.newPage()
    page.throttleNetwork(networkProfiles['Slow 3G'])
    await page.goto('https://www.google.com/')

    page.close()
}