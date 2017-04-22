var jsonfile = require('jsonfile')
var express = require('express')
var app = express()
var port = process.env.PORT || 8080

app.set('view_engine', 'ejs')

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('index.ejs', {title: '🐱CATS🐱'})
})

const CATS_DATA = 'data/cats.json'
var catrouter = express.Router()

catrouter.get('', function (req, res) {
  jsonfile.readFile(CATS_DATA, function (err, obj) {
    if (err) { res.send(err); return }
    res.render('allcats.ejs', {title: 'ALL CATS xD', cats: obj.cats})
  })
})

catrouter.get('/*', function (req, res) {
  var cat = req.url.slice(1)
  jsonfile.readFile(CATS_DATA, function (err, obj) {
    if (err) { res.send(err); return }
    res.render('onecat.ejs', {title: cat, catname: cat, cat: obj.cats[cat]})
  })
})

app.use('/cat', catrouter)

app.listen(port)
