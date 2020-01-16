const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
const cheerio = require('cheerio')
const vo = require('vo')
const jsonDir = process.cwd() + '/src/data/CreditPromoBankMega.json'



const fs = require('fs')


let run = function* () {

    const url = 'https://www.bankmega.com/promolainnya.php'
    const id_targetList = ['travel', 'lifestyle', 'fnb', 'gadget_entertainment', 'dailyneeds', 'others_promo']

    let result = {}
    for (let i = 0; i < id_targetList.length; i++) {
        let promo =
            yield nightmare
                .goto(url)
                .click(`#${id_targetList[i]}`)
                .wait(500)
                .evaluate(() => document.querySelector('body').innerHTML)
        result[id_targetList[i]] = proceedHtml(promo)
    }

    return result
}



const proceedHtml = html => {
    const $ = cheerio.load(html)
    const eachPromo = []
    $('#promolain > li > a > img').each((i, el) => {
        eachPromo.push(
            {
                title: el.attribs['title'],
                image: `https://www.bankmega.com/${el.attribs['src']}`
            }
        )
    })
    return eachPromo
}



const creditPromoBankMega = new Promise((resolve, reject) => {

    vo(run)(function (err, credit) {
        if (!err) {
            const jsonCredit = JSON.stringify(credit)

            fs.writeFile(jsonDir, jsonCredit, err => {
                if (err) {
                    console.log(err)
                    reject('Error when saving Bank Mega promo credit JSON Data')
                } else {

                    resolve('Scraping credit promo Bank Mega success')
                }
            })



        } else {
            reject('Error when scraping Bank Mega')
        }
    })

})



module.exports = creditPromoBankMega    