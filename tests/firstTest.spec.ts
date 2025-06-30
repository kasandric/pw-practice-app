import { test } from '@playwright/test'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator synax rules', async({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    //by ID
    page.locator('#inputEmail1')

    //by Class value
    page.locator('.shape-rectangle')

    //by atribute
    page.locator('[placeholder="Email"]')

    //by Class value(full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine diferent selectors
    page.locator('input[placeholder="Email"][nbimput]')

    // by XPath (not recomended)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is(Using the Grid)')




})



