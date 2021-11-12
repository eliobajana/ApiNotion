const express = require('express')
const getDatos = require('./services/notion')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('public'))

app.get('/informacion', async(req, res) => {
    const informacion = await getDatos()
    res.json(informacion)
})
app.listen(PORT, console.log(`Server started on port ${PORT}`))


/*;(asyn c () =>{
    const nInfo = await getDatos()
    console.log(nInfo)
})()*/
