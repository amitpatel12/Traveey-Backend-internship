const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
require('./db/config')
const employeeRouter = require('./routers/employeerouter')
const taskRouter = require('./routers/taskrouter');
const PORT = process.env.PORT || 4000

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/employee',employeeRouter)
app.use('/task',taskRouter)

app.listen(PORT, function(error){
    if (error) throw error
    console.log("Server created Successfully on PORT", PORT)
})
