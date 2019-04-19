
const express = require('express')
const app = module.exports = express()

var counters = {}

app.get('/counter/v1/:counterId', function(req, res)
{
    var counterId = req.params.counterId
    var counter = counters[counterId];
    if (!counter)
        counter = 0;
    res.send({counter: counterId, value: counter});
})

app.post('/counter/v1/:counterId', function(req, res)
{
    var counterId = req.params.counterId
    var counter = counters[counterId];
    if (!counter)
        counter = 0;
    ++counter;
    counters[counterId] = counter;
    res.send({counter: counterId, value: counter});
})
