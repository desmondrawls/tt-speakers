var _ = require('lodash')

function layout(items) {
    return (
    {
        collection: {
            version: '1.0',
            href: 'http://localhost:3000/',

            links: [
                {rel: 'index', href: 'http://localhost:3000/'}
            ],

            items: items,

            queries: [
                {
                    rel: 'search', href: 'http://localhost:3000/search', prompt: 'Search',
                    data: [
                        {name: 'email', value: ''}
                    ]
                }
            ],

            template: {
                data: [
                    {name: 'first-name', value: '', prompt: 'First name'},
                    {name: 'last-name', value: '', prompt: 'Last name'},
                    {name: 'email', value: '', prompt: 'Email'},

                ]
            }

        }
    })
}

function speakers(speakers) {
    return _.reduce(speakers, function(current, next){
        current.push(speaker(next))
        return current
    }, [])
}


function speaker(speaker) {
    return (
        {
            href: 'http://localhost:3000/' + speaker.id,
            data: [
                {name: 'first-name', value: speaker.name.first, prompt: 'First name'},
                {name: 'last-name', value: speaker.name.last, prompt: 'Last name'},
                {name: 'email', value: speaker.email, prompt: 'Email'},
            ],
            links: [
                {rel: 'funny', href: 'www.funnyordie.com', prompt: 'Funny site'}
            ]
        }
    )
}

exports.speakers = speakers
exports.layout = layout