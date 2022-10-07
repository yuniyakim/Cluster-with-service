const express = require('express');
const app = express();
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();

collectDefaultMetrics({ register });

const counter = new client.Counter({
  name: 'requests_amount',
  help: 'Amount of successful requests to service',
  registers: [register],
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.get('/:name', (req, res) => {
  res.send(`Bye, ${req.params.name}!`);
  counter.inc();
});

app.get('/', (req, res) => {
  res.send(`Bye, world!`);
  counter.inc();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});