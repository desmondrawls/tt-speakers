var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
var _ = require('lodash')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var helpers = require('./helpers')

var Speaker = require('./db').Speaker

app.set('views', './views')
app.set('view engine', 'jade')
app.use(morgan('combined'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/stylesheets', express.static('stylesheets'));
app.use(bodyParser.urlencoded({ extended: true }))

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
    Speaker.find({}, function(err, speakers){
        res.render('index', {speakers: speakers})
    })
})

var speakerRouter = require('./speaker')
app.use('/speakers/:id', speakerRouter)

app.get('/speakers/error/:id', function(req, res){
    res.status(404).send('No speaker with id ' + req.params.id + ' found')
})

var server = app.listen(3000, function(){
    console.log('Speakers server running at htttp://localhost:' + server.address().port)
})

