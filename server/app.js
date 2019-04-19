
const express = require('express')
const app = express()

var state = require('./counter/state/counter.js')
var state_slow = require('./counter/state_slow/counter.js')
var sql = require('./counter/sql/counter.js')
var redis = require('./counter/redis/counter.js')
var texts = require('./text/text.js')

app.use(state);
app.use(state_slow);
app.use(sql);
app.use(redis);
app.use(texts);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
