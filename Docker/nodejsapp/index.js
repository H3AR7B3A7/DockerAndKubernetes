const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.json([
    {
    name: 'Steven',
    email: 'steven.d.hondt.sdh@gmail.com'
    },
    {
        name: 'Testies',
        email: 'testies@gmail.com'
    },
    {
        name: 'john',
        email: 'john@doe.com'
    }
]))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})