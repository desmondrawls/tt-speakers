var express = require('express')
var app = express()

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

app.get('/', function(req, res){
    var buffer = ''

    speakers.forEach(function(speaker){
        buffer += '<a href="/speakers/' + speaker.id + '">' + speaker.name.full + '</a><br>'
    })

    res.send(buffer)
})

app.get('/speakers/:id', function(req, res){
    var id = req.params.id
    var speaker = _.find(speakers, function(speaker){
        return speaker.id == id
    })
    res.send(speaker.name.full)
})

var server = app.listen(3000, function(){
    console.log('Speakers server running at htttp://localhost:' + server.address().port)
})

