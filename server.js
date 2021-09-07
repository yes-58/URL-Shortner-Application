const express = require("express");
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app=express();

//mongodb+srv://admin-yash:123Test123@cluster0.vhc8o.mongodb.net/urlShortener
//mongodb://localhost/urlShortener

mongoose.connect('mongodb+srv://admin-yash:123Test123@cluster0.vhc8o.mongodb.net/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true    //useUnifiedTopology will avoiding deprecated error.
})


app.set('view engine','ejs');
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {                    //Home Page
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
  
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);