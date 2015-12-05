var path = require('path')
var fs = require('fs')
var _ = require('lodash')

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

exports.getSpeakerFilePath = getSpeakerFilePath
exports.getSpeaker = getSpeaker
exports.verifySpeaker = verifySpeaker
exports.saveSpeaker = saveSpeaker