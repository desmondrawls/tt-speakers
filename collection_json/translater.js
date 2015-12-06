var _ = require('lodash')

function speakers(body) {
    return _.map(body.collection.items, function(item){
        return speaker(item)
    })
}

function speaker(item){
    var speaker = {}
    _.each(item.data, function(attribute){
        if(attribute.name != 'id'){
            speaker[attribute.name] = attribute.value
        }
    })
    return speaker
}

exports.speakers = speakers