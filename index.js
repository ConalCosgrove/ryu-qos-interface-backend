const app = require('express')();
const request = require('superagent');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.get('/switches', (req, res) => {
    request.get('http://192.168.56.3:8080/v1.0/topology/switches')
    .then((resp) => {
        res.header('Access-Control-Allow-Origin','http://localhost:3000').send(JSON.parse(resp.text));
        console.log('Got',resp.text);
    });
});

app.get('/qos/queue/*', (req, res) => {
    console.log(req.originalUrl);

    const switchId = req.originalUrl.split('/queue/')[1];
    console.log('Getting queue info for switch' ,switchId);
    const url = `http://192.168.56.3:8080/qos/queue/${switchId}`;
    console.log(url);
    request.get(url)
    .then((resp) => {
        res.header('Access-Control-Allow-Origin','http://localhost:3000').send(JSON.parse(resp.text));
    })
    .catch((err) => {
        res.status(400).send(err);
        console.log('Failed to get queues', err.response.text);
    });
});

app.post('/qos/queue/*', (req, res) => {
    const switchId = req.originalUrl.split('/queue/')[1];
    console.log('Adding queue to switch', switchId);
    console.log(req.body);
    request.post(`http://192.168.56.3:8080/qos/queue/${switchId}`)
    .send(req.body)
    .then((resp) => {
        res.header('Access-Control-Allow-Origin','http://localhost:3000').header('Access-Control-Allow-Methods', 'POST').header('Access-Control-Allow-Headers','Content-Type').send(resp);
    })
    .catch((err) => {
        res.header('Access-Control-Allow-Origin','http://localhost:3000').header('Access-Control-Allow-Methods', 'POST').header('Access-Control-Allow-Headers','Content-Type').status(400).send(err);
        console.log('Failed to add queue', err);
    });

});

app.options('/qos/queue/*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'POST').header('Access-Control-Allow-Headers','Content-Type').header('Access-Control-Allow-Origin','http://localhost:3000').send('hi');
});


app.get('/qos/rules/*', (req, res) => {
    console.log(req.originalUrl);

    switchId = req.originalUrl.split('/rules/')[1];
    console.log('Getting rule info for switch' ,switchId);
    const url = `http://192.168.56.3:8080/qos/rules/${switchId}`;
    console.log(url);
    request.get(url)
    .then((resp) => {
        res.header('Access-Control-Allow-Origin','http://localhost:3000').send(JSON.parse(resp.text));
    })
    .catch((err) => {
        res.status(400).send(err);
        console.log('Failed to get rules', err.response.text);
    });
});

app.get('/qos/meter/*', (req, res) => {
    console.log(req.originalUrl);

    switchId = req.originalUrl.split('/meter/')[1];
    console.log('Getting meter info for switch' ,switchId);
    const url = `http://192.168.56.3:8080/qos/meter/${switchId}`;
    console.log(url);
    request.get(url)
    .then((resp) => {
        res.header('Access-Control-Allow-Origin','http://localhost:3000').send(JSON.parse(resp.text));
    })
    .catch((err) => {
        res.status(400).send(err);
        console.log('Failed to get meters', err.response.text);
    });
});

app.listen('3333', () => {
    console.log('listening on port 3333');
});
