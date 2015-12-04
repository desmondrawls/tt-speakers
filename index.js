var express = require('express')
var app = express()
var morgan = require('morgan')
var fs = require('fs')
var _ = require('lodash')
var speakers = []

fs.readFile('speakers.json', {encoding: 'utf8'}, function(err, data){
    if(err) throw err

    JSON.parse(data).forEach(function (speaker) {
        speaker.name.full = _.startCase(speaker.name.first + ' ' + speaker.name.last)
        speakers.push(speaker)
    })
})

app.set('views', './views')
app.set('view engine', 'jade')
app.use(morgan('combined'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/stylesheets', express.static('stylesheets'));

app.get('/', function(req, res){
    res.render('index', {speakers: speakers})
})

app.get('/speakers/:id', function(req, res){
    var id = req.params.id
    var speaker = _.find(speakers, function(speaker){
        return speaker.id == id
    })
    res.render('show', {speaker: speaker})
})

var server = app.listen(3000, function(){
    console.log('Speakers server running at htttp://localhost:' + server.address().port)
})

