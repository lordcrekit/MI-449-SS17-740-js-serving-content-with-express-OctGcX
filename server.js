var express = require('express')
var app = express()
var port = process.env.PORT || 8080

app.set('view_engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index.ejs')
})

app.listen(port)
