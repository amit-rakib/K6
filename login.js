import { browser } from 'k6/experimental/browser';
import { check } from 'k6';

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
};

export default async function () {
    const page = browser.newPage();
    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    // Fix: Using .first() to select the first matching element
    await page.locator("body > app-root > form-comp > div > form > div:nth-child(1) > input").type('Amit');
    await page.locator("input[name='email']").type("async@hub.com");
    await page.locator("#exampleInputPassword1").type("hello1234");
    
    // Check the checkbox correctly
    const checkbox = page.locator("#exampleCheck1");
    await checkbox.check();

    // Correct button click
    const submitButton = page.locator("input[value='Submit']");
    await submitButton.click();

    // take screenshot
    page.screenshot({ fullPage:true,
        path: 'screenshots/test1.png'
    })

    // Validate text content manually
    const alertText = await page.locator("//div[@class='alert alert-success alert-dismissible']").textContent();
    check(alertText, {
        'Form submission success message displayed': (text) => text.includes("Success!")
    });

    await page.close();
}
