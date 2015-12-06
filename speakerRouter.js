var express = require('express')
var helpers = require('./helpers')
var jsonTemplates = require('./collectionJsonTemplates')


var router = express.Router({
    mergeParams: true
})

var Speaker = require('./db').Speaker

router.use(function (req, res, next) {
    console.log('---------------')
    console.log(req.method, 'for speaker ', req.params.id, ' at ' + req.path)
    console.log('---------------')
    next()
})

router.get('/', helpers.verifySpeaker, function (req, res) {
    Speaker.findById(req.params.id, function (err, speaker) {
        respondWithSpeaker(res, speaker)
    })
})

router.put('/', helpers.verifySpeaker, function (req, res) {
    console.log("updating with ", req.body)
    Speaker.findByIdAndUpdate(req.params.id, req.body, function (err, speaker) {
        respondWithSpeaker(res, speaker)
    })
})

router.delete('/', helpers.verifySpeaker, function (req, res) {
    Speaker.findByIdAndRemove(req.params.id, function (err, speaker) {
        res.sendStatus(200)
    })
})

function respondWithSpeaker(res, speaker) {
    res.format({
        html: function () {
            res.render('show', {speaker: speaker})
        },
        json: function () {
            res.send(JSON.stringify(jsonTemplates.layout(jsonTemplates.speakers([speaker]))))

        }
    })
}

module.exports = router


