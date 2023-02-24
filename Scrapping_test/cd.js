const puppeteer =  require('puppeteer');
const nodemailer = require('nodemailer');
require('dotenv').config();

(async() => {

// Ouvrir un navigateur (chronium)
    const browser = await puppeteer.launch()

// Ouvrir une page dans ce navigateur
    const page = await browser.newPage()

// se rendre a l'url demandé
    await page.goto('https://www.amazon.fr/Apple-Airpods-Pro-2%E1%B5%89-g%C3%A9n%C3%A9ration-bo%C3%AEtier/dp/B0BDJ37NF5/ref=sr_1_2?crid=1FCTOTSSYPQC9&keywords=airpods+pro+2&qid=1677263238&sprefix=air%2Caps%2C255&sr=8-2')

    //get body

    let price = await page.evaluate(() => {
        return document.querySelector('span [class=a-price-whole]').innerText
    });

    let newPrice = await price.substring(0, 3);
    
    console.log('le prix des airpods pro 2 est de '+newPrice+" €")

    if (parseInt(newPrice) < 261){
        sendNotification(newPrice);
    } 

    async function sendNotification(newPrice) {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.MAIL,
            pass: process.env.SMTP_PASSWORD,
          },
        });
    
        let info = await transporter
          .sendMail({
            from: '"Airpods Pro" <meria.dap@gmail.com>',
            to: "meria.dap@hotmail.fr",
            subject: "Prix sous les " + newPrice + "€",
            html: 'le prix des airpods pro 2 est de '+newPrice+" €",
          })
          .then(() => console.log("Message envoyé"));
      }
    
    
    await browser.close()
})
().catch(err => {
    console.log(err.message)
})