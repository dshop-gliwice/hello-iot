var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var path = require('path');

var ranking = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/hello', function (req, res) {
    res.send('Hello ' + (req.query.name || 'Stranger'));
//    res.send({"a":"b"});
})

app.post('/ranking', function (req, res) {
    if (ranking.length<20 && req.body.name) {
        if (!ranking.some((entry) => {return entry.name===req.body.name})) {
            ranking.push({name: req.body.name, time: new Date().toISOString()})
            return res.send({ranking: ranking.length});
        }
    }
    res.send({ranking: -1});
})

app.get('/ranking', function (req, res) {
    res.send(ranking);
})


app.get('/', function (req, res) {
    res.redirect(basePath(req) + "/api-console/");
});

function basePath(req) {
    var externalPathValue = req.header("hybris-external-path");

    if (externalPathValue) {
        //remove trailing slash, if any
        return externalPathValue.replace(/\/$/, "");
    } else {
        return "";
    }
}
module.exports = app;