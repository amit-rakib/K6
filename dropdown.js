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
   const page = browser.newPage();
   page.goto("https://rahulshettyacademy.com/AutomationPractice/")

  //const dropdown = page.locator("#dropdown-class-example")
 // dropdown.selectOption('Option2')

 const values = await page.$$('#dropdown-class-example')
 for (const value of values){
    const valueName = await value.textContent()
    if(valueName === 'Option2'){
        await page.selectOption('#dropdown-class-example', valueName)
        break;
    }
 }

  page.waitForTimeout(5000)
  page.close()
}