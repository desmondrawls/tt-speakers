var Speaker = require('./db').Speaker

function verifySpeaker(req, res, next) {
    next()
}

exports.verifySpeaker = verifySpeaker