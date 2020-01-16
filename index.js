const { creditPromoBankMage, mutualFundManulife } = require('./src/lib')
const logger = process.env.DEBUG || false
const port = process.env.PORT || 7000
const fastify = require('fastify')({ logger })
const CronJob = require('node-cron')
const fs = require('fs')

const dataJsonDir = {
  bankmega: 'CreditPromoBankMega.json',
  manulife: 'MutualFundManulife.json'
}


CronJob.schedule('0 12 * * *', () => {
  creditPromoBankMage
    .then(snap => console.log(snap))
    .catch(err => console.log(err))
  mutualFundManulife
    .then(snap => console.log(snap))
    .catch(err => console.log(err))

})


fastify.get('/', async (req, res) => {
  const template = `  
  <h1> Hallo ${req.ip}</h1>
  <h2>Get JSON Promo Kredit Bank Mega: <a href="/json?search=bankmega">here</a></h2>
  <h2>Get JSON Reksadana Manulife : <a href="/json?search=manulife">here</a></h2>
  
  `
  res.type('text/html').send(template)
})



fastify.get('/json', (req, res) => {
  const { search } = req.query

  if (search) {
    const jsonFile = JSON.parse(fs.readFileSync(process.cwd() + `/src/data/${dataJsonDir[search]}`, 'utf8'))
    res.type('application/json').send(jsonFile)
  } else {
    res.type('application/json').send({ search: null })
  }



})

fastify.listen(port, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})


