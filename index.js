var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
var _ = require('lodash')
var bodyParser = require('body-parser')
var morgan = require('morgan')

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

function verifySpeaker (req, res, next) {
    var speakerFilePath = getSpeakerFilePath(req.params.id)

    fs.exists(speakerFilePath, function(yes){
        if (yes) {
            next()
        } else {
            res.redirect('/speakers/error/' + req.params.id)
        }
    })
}

function saveSpeaker (speakerId, data) {
    var fp = getSpeakerFilePath(speakerId)
    fs.unlinkSync(fp)
    fs.writeFileSync(fp, JSON.stringify(data, null, 2), {encoding: 'utf8'})
}

app.get('/format/tester', function(req, res){
    res.format({
        text: function(){
            res.send('text');
        },

        html: function(){
            res.send('html');
        },

        json: function(){
            res.send('json');
        }
    });
})

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

app.all('/speakers/:id', function(req, res, next){
    console.log(req.method, 'for', req.params.id)
    next()
})

app.get('/speakers/:id', verifySpeaker, function(req, res){
    var speaker = getSpeaker(req.params.id)
    res.render('show', {speaker: speaker})
})

app.get('/speakers/error/:id', function(req, res){
    res.status(404).send('No speaker with id ' + req.params.id + ' found')
})

app.put('/speakers/:id', verifySpeaker, function(req, res){
    var speaker = getSpeaker(req.params.id)
    console.log(req.body.firstName)
    speaker.name.first = req.body.firstName
    speaker.name.last = req.body.lastName
    speaker.email = req.body.email
    saveSpeaker(speaker.id, speaker)
    res.render('show', {speaker: speaker})
})

app.delete('/speakers/:id', verifySpeaker, function (req, res) {
    var filePath = getSpeakerFilePath(req.params.id)
    fs.unlinkSync(filePath)
    res.sendStatus(200)
})

var server = app.listen(3000, function(){
    console.log('Speakers server running at htttp://localhost:' + server.address().port)
})

