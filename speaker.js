var express = require('express')
var helpers = require('./helpers')
var fs = require('fs')

var router = express.Router({
    mergeParams: true
})

router.all('/', function (req, res, next) {
    console.log(req.method, 'for', req.params.id)
    next()
})

router.get('/', helpers.verifySpeaker, function (req, res) {
    res.format({
        html: function () {
            var speaker = helpers.getSpeaker(req.params.id)
            res.render('show', {speaker: speaker})
        },

        json: function () {
            var readableSpeaker = fs.createReadStream('./speakers/id' + req.params.id + '.json')
            readableSpeaker.pipe(res)
        }
    });

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


