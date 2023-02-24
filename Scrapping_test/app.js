const puppeteer =  require('puppeteer');

(async() => {


    const browser = await puppeteer.launch()
    console.log('browser ok')

    const page = await browser.newPage()
    console.log('page ok')

    await page.goto('https://saint-lo.coiffeur-chez-max.com/?gclid=Cj0KCQiA3eGfBhCeARIsACpJNU98jxPXrNHViRjlkwMuzbpGL2TNWkRW2PjKy5XuzeH8_8tNCZOgYXwaArXMEALw_wcB')
    console.log('site web ok')

    await page.setViewport({
        width: 1200,
        height: 800
    })

    await (await page).screenshot({
        path: 'image.png'
    })
    console.log('image ok')

})().catch(err => {
    console.log(err.message)
})