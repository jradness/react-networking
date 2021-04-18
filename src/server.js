const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const cardList = [];

app.get('/', (req, res) => {
  res.send(cardList);
});

app.post('/', (req, res) => {
  const pokeCard = req.body;
  cardList.push(pokeCard);
  res.status(200).send(cardList);
});

app.listen(9000, () => console.log("App running on port 9000!"));

module.exports = app;
