const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const staticpath = path.join(__dirname, '/');

var antares = require('antares-http');

app.use(express.static(staticpath));

app.get('/', (req, res) => {
  res.sendFile(staticpath + '/index.html');
});

app.get('/dashboard', function (req, res) {
  res.sendFile(staticpath + '/dashboard.html');
});

app.get('/api', function (req, res) {
  antares.setAccessKey('73f31a9cef870dc9:53d9b1416ecb1d3d');
  const suhu = antares.get('MacopadCPS', 'Macopad01').then(function (response) {
    const data = response.content;
    return data;
  });
  const kipas = antares.get('MacopadCPS', 'Macopad02').then(function (response) {
    const data = response.content;
    return data;
  });
  const value = async () => {
    const sensor1 = await suhu;
    const sensor2 = await kipas;
    const api = { sensor1, sensor2 };
    res.json(api);
  };
  value();
});

app.listen(port);
