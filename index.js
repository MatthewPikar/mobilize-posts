/**
 * Created by mattpiekarczyk on 11/4/15.
 */
"use strict"

var _ = require('lodash')
var options = {}

for(var i= 2, len=process.argv.length; i<len; i++){
    var argument = process.argv[i].split(':')
    options[argument[0]] = argument[1]
}

_.extend(options, {
    resourceName: 'posts',
    resourceFormat: {
        required$: ['sourceId','name'],
        only$: ['id','sourceId','name','created','modified','date','content'],
        id: 'string$',
        sourceId: 'string$',
        name: 'string$',
        created: 'string$',
        modified: 'string$',
        date: 'string$',
        content: 'string$'
    }
})

var resourceService = require('resource-service')
require('seneca')()
    .use('redis-transport')
    .use(resourceService, options)
    .listen({type:'redis', pin:'role:posts,cmd:get'})
    .listen({type:'redis', pin:'role:posts,cmd:query'})
    .listen({type:'redis', pin:'role:posts,cmd:add'})
    .listen({type:'redis', pin:'role:posts,cmd:modify'})
    .listen({type:'redis', pin:'role:posts,cmd:delete'})