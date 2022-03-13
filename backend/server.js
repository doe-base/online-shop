require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Shop = require('./models/shop')
const multer = require('multer')
const path = require('path')

//create express app
const app = express()


//set ejs as prefered view engine
app.set('view engine', 'ejs')


//connect to mongoDB and listen for request 
const port = process.env.PORT || 8080 
const dbURI = 'mongodb+srv://doe_idoko:HRknLdDkw7P37zj@nodedb.wvunv.mongodb.net/shopDB?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(port, console.log(`Listening on port ${port}...`)))
    .catch(err => console.log(err))


//set up multer for uploading image 
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'Images')
    },
    filename: (req, file, cb) =>{
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})


// middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res)=>{
     res.render('index')
})

app.get('/faq', (req, res)=>{
    res.render('faq')
})

app.get('/about', (req, res)=>{
    res.render('about')
})

app.get('/shop', (req, res)=>{
    Shop.find().sort({ createdAt: - 1 })
        .then(result => res.render('shop', {shops: result}))
        .catch(err => console.log(err))
    
})

app.get('/shop/admin-101', (req, res)=>{
    res.render('admin')
})

app.post('/shop', upload.single('image'), (req, res)=>{

    // res.send("Image Uploaded")
    const shop = new Shop(req.body)
    shop.save()
        .then(res => alert('item add successfully'))
        .catch(err => console.log(err))
})


app.use((req, res)=>{
    res.status(404).render('404')
})