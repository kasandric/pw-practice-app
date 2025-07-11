import { test, expect } from '@playwright/test'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the grid"}).getByRole('textbox', {name: "Email"})

        await usingTheGridEmailInput.fill('test@test.com');
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.ru', {delay: 500})

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.ru')

        //locator assertion 
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.ru')
    })

    test('radio buttons', async({page}) =>{
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the grid"})

        //await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio',{name: "Option 1"}).check({force: true})
        const radioStatus = await usingTheGridForm.getByRole('radio',{name: "Option 1"}).isChecked()
        expect(radioStatus).toBeTruthy
        await expect(usingTheGridForm.getByRole('radio',{name: "Option 1"})).toBeChecked()

        await usingTheGridForm.getByRole('radio',{name: "Option 2"}).check({force: true})
        expect(radioStatus).toBeFalsy
        await expect(usingTheGridForm.getByRole('radio',{name: "Option 2"})).toBeChecked()




    })
})

test('checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()){
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()
    }

})