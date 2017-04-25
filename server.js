var express = require('express')
var app = express()
var port = process.env.PORT || 8080

app.set('view_engine', 'ejs')

app.use(express.static('public'))

const CATS_DATA = require('./data/cats.json')

// Serve homepage
app.get('/', function (req, res) {
  let keys = Object.keys(CATS_DATA.cats)
  let cat = keys[Math.floor(Math.random() * keys.length)]
  res.render('index.ejs',
    {title: 'CATS', catname: cat, cat: CATS_DATA.cats[cat]})
})

// Serve all cats
app.get('/cat', function (req, res) {
  res.render('allcats.ejs', {title: 'ALL CATS xD', cats: CATS_DATA.cats})
})

// Serve single cat
app.get('/cat/:catname', function (req, res) {
  var catname = req.params.catname
  var cat = CATS_DATA.cats[catname]
  if (!cat) {
    res.status(404).end('404 - page not found')
    return
  }
  res.render('onecat.ejs', {title: catname, catname: catname, cat: cat})
})

// Handle 404
app.get('*', function (req, res) {
  res.status(404).end('404 - page not found')
})

app.listen(port)
