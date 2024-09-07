const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
const taskRoutes = require('./routes/tasks.routes')


const app = express();

app.use(cors(corsOptions)) // permite comunicar next js y react
app.use(morgan('dev'))
app.use(express.json())
app.use(taskRoutes)
app.use((err,req, res, next) =>{
    return res.json({
        message: err.message
    })
})
app.listen(4000)

console.log('server on port 4000')