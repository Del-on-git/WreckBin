const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const viewRouter = require('./routes/view.js');
const recordRouter = require('./routes/record.js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/bins', viewRouter);

app.use('/record', recordRouter);

app.use((req, res, next) => {
  res.status(404);
  res.send(process.env.RESOURCE_NOT_FOUND);
});

app.use((err, req, res, next) => {
  res.status(500);
  res.send(process.env.SERVER_ERROR);
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log("Server is up and listening on port", process.env.PORT);
});
