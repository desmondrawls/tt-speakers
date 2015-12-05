var express = require('express')
var helpers = require('./helpers')
var fs = require('fs')

var router = express.Router({
    mergeParams: true
})

var Speaker = require('./db').Speaker

router.use(function (req, res, next) {
    console.log(req.method, 'for speaker ', req.params.id, ' at ' + req.path, ' accepting ' + req.accepts('json'))
    next()
})

router.get('/', helpers.verifySpeaker, function (req, res) {
    var speakerId = req.params.id
    Speaker.findOne({'speakerId': speakerId}, function (err, speaker) {
        res.format({
            html: function () {
                res.render('show', {speaker: speaker})
            },
            json: function () {
                res.send(speaker)
            }
        })
    })
})

router.put('/', helpers.verifySpeaker, function (req, res) {
    var speaker = helpers.getSpeaker(req.params.id)
    console.log(req.body.firstName)
    speaker.name.first = req.body.firstName
    speaker.name.last = req.body.lastName
    speaker.email = req.body.email
    helpers.saveSpeaker(speaker.id, speaker)
    res.render('show', {speaker: speaker})
})

router.delete('/', helpers.verifySpeaker, function (req, res) {
    var filePath = helpers.getSpeakerFilePath(req.params.id)
    fs.unlinkSync(filePath)
    res.sendStatus(200)
})

module.exports = router


