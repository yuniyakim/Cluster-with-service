const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`Hello, world!`);
});

app.get('/:name', (req, res) => {
  res.send(`Hello, ${req.params.name}!`);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});