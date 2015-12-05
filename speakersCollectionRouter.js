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
        res.render('index', {speakers: speakers})
    })
})

router.post('/', function(req, res){
    var speaker = new Speaker(req.body)
    speaker.save()
    res.redirect('/')
})

module.exports = router