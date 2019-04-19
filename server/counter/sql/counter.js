
const express = require('express')
const app = module.exports = express()
const sqlite3 = require('sqlite3').verbose();

const path = require('path');
const dbPath = path.resolve(__dirname, './counter.db')

var db = new sqlite3.Database(dbPath);

db.serialize(function() {
  db.run("CREATE TABLE if not exists counters (id VARCHAR, value INTEGER, CONSTRAINT id_pk PRIMARY KEY (id))");
});


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var counters = {}

app.get('/counter/v3/:counterId', function(req, res)
{
    var counterId = req.params.counterId
    db.get('SELECT value FROM counters WHERE id = ?', [counterId], function(err, row) 
    {
        if (err)
            return res.status(500).send(err);
        var counter = 0;
        if (row)
            counter = row.value;
        res.send({counter: counterId, value: counter});
    });
})

app.post('/counter/v3/:counterId', function(req, res)
{
    var counterId = req.params.counterId
    db.get('SELECT value FROM counters WHERE id = ?', [counterId], async function(err, row) 
    {
        if (err)
            return res.status(500).send(err);
        await sleep(3000)
        if (row)
        {
            counter = row.value + 1;
            db.run('UPDATE counters SET value = ? WHERE id = ?', [counter, counterId], function(err)
            {
                if (err)
                    return res.status(500).send(err);
                res.send({counter: counterId, value: counter});
            });
        }
        else
        {
            db.run('INSERT INTO counters VALUES(?, 1)', [counterId], function(err)
            {
                if (err)
                    return res.status(500).send(err);
                res.send({counter: counterId, value: 1});
            });
        }
    });
})
