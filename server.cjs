const express = require('express')
const app = express()
const cors = require('cors');
const connectDB = require('./config/db.cjs')
const taskmanager = require('./routes/routes.cjs');
const path = require('path');
const port = 3002

app.use(cors())
app.use(express.json()); 

connectDB()

app.use('/taskmanager', taskmanager);

const dirPath = path.resolve()
app.use(express.static('dist'))
app.get('*', (req,res) => {
    res.sendFile(path.resolve(dirPath,'dist','index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})