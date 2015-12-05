var express = require('express')
var app = express()
var morgan = require('morgan')
var path = require('path')
var fs = require('fs')
var _ = require('lodash')
var bodyParser = require('body-parser')

app.set('views', './views')
app.set('view engine', 'jade')
app.use(morgan('combined'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/stylesheets', express.static('stylesheets'));
app.use(bodyParser.urlencoded({ extended: true }))

function getSpeakerFilePath (speakerId) {
    return path.join(__dirname, 'speakers', 'id' + speakerId) + '.json'
}

function getSpeaker (speakerId) {
    var speaker = JSON.parse(fs.readFileSync(getSpeakerFilePath(speakerId), {encoding: 'utf8'}))
    speaker.name.full = _.startCase(speaker.name.first + ' ' + speaker.name.last)
    return speaker
}

function saveSpeaker (speakerId, data) {
    var fp = getSpeakerFilePath(speakerId)
    fs.unlinkSync(fp) // delete the file
    fs.writeFileSync(fp, JSON.stringify(data, null, 2), {encoding: 'utf8'})
}

app.get('/', function(req, res){
    var speakers = [];
    fs.readdir('speakers', function (err, files) {
        files.forEach(function (file) {
            fs.readFile(path.join(__dirname, 'speakers', file), {encoding: 'utf8'}, function (err, data) {
                var speaker = JSON.parse(data)
                speaker.name.full = _.startCase(speaker.name.first + ' ' + speaker.name.last)
                speakers.push(speaker)
                if (speakers.length === files.length) res.render('index', {speakers: speakers})
            })
        })
    })
})

app.get('/speakers/:id', function(req, res){
    var speaker = getSpeaker(req.params.id)
    res.render('show', {speaker: speaker})
})

app.put('/speakers/:id', function(req, res){
    var speaker = getSpeaker(req.params.id)
    console.log(req.body.firstName)
    speaker.name.first = req.body.firstName
    speaker.name.last = req.body.lastName
    speaker.email = req.body.email
    saveSpeaker(speaker.id, speaker)
    res.render('show', {speaker: speaker})
})

var server = app.listen(3000, function(){
    console.log('Speakers server running at htttp://localhost:' + server.address().port)
})

