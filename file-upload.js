import { check } from 'k6';
import { browser } from 'k6/experimental/browser';


export const options = {
    scenarios: {
        browser_test: {
            executor: 'shared-iterations',
            options: {
                browser: {
                    type: 'chromium'
                }
            }
        }
    }
}

export default async function(){
    const page = browser.newPage()

   await page.goto("https://rahulshettyacademy.com/upload-download-test/")
   await page.setInputFiles('#fileinput', {name:'testData/download.xlsx'})
   page.waitForTimeout(5000)


   check(page, {'Text Validation': p=>p.locator(".Toastify__toast-body div:nth-child(2)").textContent() == "Updated Excel Data Successfully."

   })

   page.close()
}