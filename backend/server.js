const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const hospitals = require('./routes/hospitals')
const appointments = require('./routes/appointments.js')

const connectDB = require('./config/db')
const auth = require('./routes/auth')
const cookieParser = require('cookie-parser')
const mongoSanitize=require('express-mongo-sanitize');
const helmet=require('helmet');
const {xss}=require('express-xss-sanitizer')
const rateLimit=require('express-rate-limit');
const hpp=require('hpp')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')

dotenv.config({"path":'./config/config.env'})

// Connect to Database
connectDB()

const app = express()

//Rate Limiting
const limiter=rateLimit({
    windowsMs:10*60*1000,//10 mins
    max: 1000
});
// cors 
// Enable CORS for all routes
app.use(cors());
// body parser
app.use(express.json());
//Sanitize data
app.use(mongoSanitize());
//Set security headers
app.use(helmet());
//Prevent XSS attacks
app.use(xss());
app.use(limiter);
//Prevent http param pollutions
app.use(hpp());

// swagger api docs
const swaggerOptions={
    swaggerDefinition:{
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple Express VacQ API'
        },
        servers:[
         {
            url: 'http://localhost:5000/api/v1'
         }
        ],
    },
    apis:['./routes/*.js'],
};
const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/api/v1/hospitals' , hospitals)
app.use('/api/v1/appointments' , appointments)

app.use('/api/v1/auth' , auth)

app.use(cookieParser())

app.get('/' , (req,res) => {
    res.send('<h1>Hello world</h1>')
    res.status(200).json({success:true , data:{id:1}})
})


const PORT = process.env.PORT || 5000
const server = app.listen(PORT , console.log('Server is running in' , process.env.NODE_ENV , 'mode on port' , process.env.PORT))

//handle promise
process.on('unhandleRejection' , (err,promise) =>{
    console.log(`Error : ${err.message}`)
    server.close(() => process.exit(1))
})