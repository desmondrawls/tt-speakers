var express = require('express')
var helpers = require('./helpers')

var router = express.Router({
    mergeParams: true
})

var Speaker = require('./db').Speaker


router.use(function (req, res, next) {
    console.log('---------------')
    console.log(req.method, ' for speakers collection')
    console.log('---------------')
    next()
})

router.get('/', function(req, res){
    Speaker.find({}, function(err, speakers){
        respondWithSpeakers(res, speakers)
    })
})

router.post('/', function(req, res){
    new Speaker(req.body).save()
    res.redirect('/')
})

function respondWithSpeakers(res, speakers) {
    res.format({
        html: function () {
            res.render('index', {speakers: speakers})
        },
        json: function () {
            res.send(speakers)
        }
    })
}

module.exports = router