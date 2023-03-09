// import { translation } from './translation.js'

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser') //for post requests

//creates express application
const app = express();

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// ------- Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();
const target = 'fil'; //lang translation

var currEngWord = "";
var currTagWord = "";

async function translateText() {

  //holds Tagalog vocab
  let [translations] = await translate.translate(currEngWord, target);
  let translationString = '';

  translations = Array.isArray(translations) ? translations : [translations];

  translations.forEach((translation, i) => {
    translationString += translation;
  });

  // console.log(`google translation: ${translationString}`);

  currTagWord = translationString;
}

//------ SERVER
//sends today's word in Tagalog translation
app.get("/", (req, res) => {

  currEngWord = req.query.englishWord;
  console.log('ENG word: ' + currEngWord);

  translateText().then((data) => {
    console.log('TAGALOG word: ' + currTagWord);
    res.json({ translation: currTagWord}); ; // prints 60 after 4 seconds.
  });;
 
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });