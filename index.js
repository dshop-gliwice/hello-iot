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
})

app.post('/ranking', function (req, res) {
    if (ranking.length<20 && req.body.name) {
        ranking.push({name: req.body.name, time: new Date().toISOString()})
    }
    res.send({ranking: ranking.length});
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
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Example app listening on port '+port);
})
