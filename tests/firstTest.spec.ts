import { test, expect } from '@playwright/test'


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

test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('Locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name:"Sign in"}).first().click()

    await page.locator('nb-card').nth(1).getByRole('button').click()
})

test ('Locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByLabel('Email').click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByLabel('Email').click()
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('.status-danger')}).getByLabel('Password').click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

test ('Reusing locators', async({page}) =>{
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test ('Ectracting values', async({page}) => {
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLables = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLables).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox', {name:"Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await  emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

})

test('assertions', async({page}) =>{
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')


    //General assertions
    const value = 5
    expect(value).toEqual(5)

    const text =await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //Locator assertion 
    await expect(basicFormButton).toHaveText('Submit')

    //Soft Assertion
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()
})



