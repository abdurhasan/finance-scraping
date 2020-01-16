const Scraper = require('./lib/reksadana-manulife');
const logger = process.env.DEBUG || true;
const port = process.env.PORT || 3001;
const fastify = require('fastify')({ logger });
const schedule = require('node-schedule');


const getData = _ => {
  return Scraper
    .then(async data => {
      // await asyncRedis.savedata('reksadana', JSON.stringify(data))
        console.log(data)
      // console.log('Scraper was successed')
    })
    .catch(_ => console.log('Scraper was an error'))
}

getData()

// schedule.scheduleJob('12 * * *', () => {
//   getData()
//   console.log('Data Reksadana was updated !')
// });


// fastify.get('/', async (req, res) => {
//   const template = `  
//   <h1> Hallo ${req.ip}</h1>
//   <h1>Get JSON : <a href="/json">here</a></h1>
//   <h1>Download File : <a href="/download">here</a></h1>  
//   `
//   res.type('text/html').send(template)
// })
// fastify.get('/json', async (req, res) => {
//   const reksadoc = await asyncRedis.getdata('reksadana');
//   res.type('application/json').send(JSON.parse(reksadoc))

// })
// fastify.get('/download', async (req, res) => {
//   let reksadoc = await asyncRedis.getdata('reksadana');
//   // reksadoc = reksadoc.slice(0, -1).substr(1)
//   res.type('application/octet').send(reksadoc)

// })


// fastify.listen(port, (err, address) => {
//   if (err) throw err
//   fastify.log.info(`server listening on ${address}`)
// })


