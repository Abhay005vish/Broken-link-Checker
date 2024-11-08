// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files and views
app.use(express.static('src/views'));
app.set('view engine', 'html');

// Routes
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
