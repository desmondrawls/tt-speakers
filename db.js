var uri = 'mongodb://localhost:27017/test'

var mongoose = require('mongoose')
mongoose.connect(uri)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
    console.log('db connected')
})

var speakerSchema = mongoose.Schema({
    email: String,
    first_name: String,
    last_name: String
})
exports.Speaker = mongoose.model('Speaker', speakerSchema)