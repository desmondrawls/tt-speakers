var _ = require('lodash')

function speakers(collectionObject) {
    return _.map(collectionObject.collection.items, function(item){
        return speakerFromAttributes(item.data)
    })
}

function speakerFromAttributes(attributes){
    var speaker = {}
    _.each(attributes, function(attribute){
        if(attribute.name != 'id'){
            speaker[attribute.name] = attribute.value
        }
    })
    return speaker
}

function templateAttributes(templateObject){
    return templateObject.template.data
}

function speakerFromTemplateObject(templateObject){
    return speakerFromAttributes(templateAttributes(templateObject))
}

exports.speakers = speakers
exports.speakerFromTemplateObject = speakerFromTemplateObject