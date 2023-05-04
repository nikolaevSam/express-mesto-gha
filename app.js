const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const URL = 'mongodb://localhost:27017/mestodb'


app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(URL, {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: "64539dc71142eabf2fa0e610"
  };
  next();
});
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});