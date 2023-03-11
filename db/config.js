const mongoose = require('mongoose')
require('dotenv').config()
const DB= process.env.DB
mongoose.connect(DB)
.then(()=> console.log('Database connection established'))
.catch(err => console.log(err))