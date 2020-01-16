const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');
const print = console.log;
const vo = require('vo');

let run = function* () {

    const url = 'https://www.bankmega.com/promolainnya.php'
    const id_targetList = ['travel', 'lifestyle', 'fnb', 'gadget_entertainment', 'dailyneeds', 'others_promo']

    let result = {};
    for (let i = 0; i < id_targetList.length; i++) {
        let promo =
            yield nightmare
                .goto(url)
                .click(`#${id_targetList[i]}`)
                .wait(500)
                .evaluate(() => document.querySelector('body').innerHTML)
        result[id_targetList[i]] = proceedHtml(promo)      
    };

    return result;
}

vo(run)(function (err, titles) {
    print(titles);
});

const proceedHtml = html => {
    const $ = cheerio.load(html);
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