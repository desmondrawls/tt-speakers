var express = require('express')
var helpers = require('./helpers')
var jsonTemplates = require('./collection_json/transformer')
var jsonTranslater = require('./collection_json/translater')

var router = express.Router({
    mergeParams: true
})

var Speaker = require('./db').Speaker

router.use(function (req, res, next) {
    console.log('---------------')
    console.log(req.method, ' for speakers collection', ' with', req.body)
    console.log('---------------')
    next()
})

router.get('/', function(req, res){
    Speaker.find({}, function(err, speakers){
        respondWithSpeakers(res, speakers)
    })
})

router.post('/', function(req, res){
    console.log("creating new speaker with ", req.body)
    var speaker = jsonTranslater.speakerFromTemplateObject(req.body)
    new Speaker(speaker).save()
    respondWithRedirect(res, '/')
})

function respondWithRedirect(res, path) {
    res.format({
        html: function() {
            res.redirect('/')
        },
        json: function() {
            res.status(201).send("")
        }
    })
}

function respondWithSpeakers(res, speakers) {
    res.format({
        html: function () {
            res.render('index', {speakers: speakers})
        },
        json: function () {
            res.json(jsonTemplates.layout('http://localhost:3000/', jsonTemplates.speakers(speakers)))
        }
    })
}

module.exports = router