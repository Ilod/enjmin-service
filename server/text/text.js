
const express = require('express')
const app = module.exports = express()
const sqlite3 = require('sqlite3').verbose();

const path = require('path');
const dbPath = path.resolve(__dirname, './text.db')
const bodyParser = require('body-parser')

var db = new sqlite3.Database(dbPath);

db.serialize(function() {
  db.run('CREATE TABLE if not exists texts (id VARCHAR, value TEXT, CONSTRAINT id_pk PRIMARY KEY (id))');
  db.run('INSERT OR IGNORE INTO texts(id, value) VALUES("welcome", "Welcome to Moche!")');
});

var textParser = bodyParser.text()


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var counters = {}

app.get('/text/v1/:textId', function(req, res)
{
    var textId = req.params.textId
    db.get('SELECT value FROM texts WHERE id = ?', [textId], function(err, row) 
    {
        if (err)
            return res.status(500).send(err);
        if (!row)
            return res.status(404).send();
        res.send({id: textId, value: row.value});
    });
})

app.post('/text/v1/:textId', textParser, function(req, res)
{
    var textId = req.params.textId
    db.run('INSERT OR REPLACE INTO texts(id, value) VALUES(?, ?)', [textId, req.body], function(err)
    {
        if (err)
            return res.status(500).send(err);
        return res.send();
    });
})
