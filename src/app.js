const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require ('express')
const hbs = require('hbs')

const app = express()

//define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handelbers engine and views location 
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


//setup static dcirectory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name :'Rafi Ahmed'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name : 'Rafi Ahmed'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Message',
        name : 'Rafi Ahmed',
        helpText : 'This is help page'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

const address = req.query.address

geocode.geocode(address, (error,{latitude,longitude,location}={})=>{
    if(error){
        return res.send({error})
    }
     forecast.forecast(latitude,longitude, (error, forecastData) => {
        if(error){
            return res.send({error})
        }
        res.send({
            forecast : forecastData,
            location,
            address : req.query.address
        })
     })
 })
    
})

app.get('/view',(req,res)=>{
    res.render('view',{
        title: 'This is Header',
        name :'And this is Footer'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name :'Rafi Ahmed',
        errorMessage: 'help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Rafi Ahmed',
        errorMessage : 'page not found.....'
    })
})

app.listen(3000,()=>{
    console.log('listenning on port 3000')
})