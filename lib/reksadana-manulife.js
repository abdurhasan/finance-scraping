const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
const siteUrl = 'https://www.klikmami.com/Reksadana/Home/Product';

module.exports = nightmare
    .goto(siteUrl)
    .wait(1500)
    .evaluate(() => {
        const typeSelector = '.card-heading.p-3'
        const codeAlt = document.querySelectorAll('div.card.rounded-0.bg-white.h-100.mb-1.mb-sm-0 img ')




        return [...document.querySelectorAll('.card-body.d-flex > a')].map((el, i) => {
            const NAB = el.innerText.split('\n')[0];
            const harga = el.innerText.split('\n')[1]
            return {
                code: codeAlt[i].alt,
                type: document.querySelectorAll(typeSelector)[i].innerText.replace(/\n/g, " "),
                product: document.querySelectorAll('.card-body.d-flex > figure > figcaption')[i].innerText,
                NAB,
                harga
            }

        })
    })
    .end()