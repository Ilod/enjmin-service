
const express = require('express')
const app = module.exports = express()
var redis = require("redis");
var client = redis.createClient();

app.get('/counter/v4/:counterId', function(req, res)
{
    var counterId = req.params.counterId
    client.get('counter:' + counterId, function(err, val)
    {
        if (err)
            return res.status(500).send(err);
        val = parseInt(val);
        if (!val)
            val = 0;
        res.send({counter: counterId, value: val});
    });
})

app.post('/counter/v4/:counterId', function(req, res)
{
    var counterId = req.params.counterId
    client.incr('counter:' + counterId, function(err, val)
    {
        if (err)
            return res.status(500).send(err);
        res.send({counter: counterId, value: val});
    });
})
