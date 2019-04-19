
const express = require('express')
const app = module.exports = express()

var counters = {}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/counter/v2/:counterId', function(req, res)
{
    var counterId = req.params.counterId
    var counter = counters[counterId];
    if (!counter)
        counter = 0;
    res.send({counter: counterId, value: counter});
})

app.post('/counter/v2/:counterId', async function(req, res)
{
    await sleep(3000)
    var counterId = req.params.counterId
    var counter = counters[counterId];
    if (!counter)
        counter = 0;
    ++counter;
    counters[counterId] = counter;
    res.send({counter: counterId, value: counter});
})
