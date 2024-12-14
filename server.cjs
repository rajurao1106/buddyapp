const express = require('express')
const app = express()
const cors = require('cors');
const connectDB = require('./config/db.cjs')
const taskmanager = require('./routes/routes.cjs');
const path = require('path');

app.use(cors())
app.use(express.json()); 

connectDB()

app.use('/taskmanager', taskmanager);

const dirPath = path.resolve()
app.use(express.static('dist'))
app.get('*', (req,res) => {
    res.sendFile(path.resolve(dirPath,'dist','index.html'))
})

app.listen(3002, () => {
    console.log('Server is running on port 3002')
})