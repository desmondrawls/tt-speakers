var express = require('express')
var app = express()
var fs = require('fs')
var _ = require('lodash')

app.get('/', function(req, res){
    res.send('Speakers are waiting!')
})

app.get('/speakers/1', function(req, res){
    res.send('Speaker: Isaac Asimov')
})

var server = app.listen(3000, function(){
    console.log('Speakers server running at htttp://localhost:' + server.address().port)
})

