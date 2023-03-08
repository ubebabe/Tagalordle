// import { translation } from './translation.js'

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser') //for post requests

//creates express application
const app = express();

var currEngWord = "";
var currTagWord = "";

//------ SERVER!! 
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


//parses incoming requests
// app.use(express.json());

//receives today's English word
app.post("/", (req, res) => {
    
    let data = req.body;
    //res.send('Data Received: ' + JSON.stringify(data));
    currEngWord = data.englishWord;
    console.log('post success/english word: ' + currEngWord);

    //calling Google API inside post 
    //so translation happens AFTER receieves english word
    translateText();
});

// ------- Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

const text = 'mom'; //english
const target = 'fil'; //lang translation

async function translateText() {

  //holds Tagalog vocab
  let [translations] = await translate.translate(currEngWord, target);
  let translationString = '';

  translations = Array.isArray(translations) ? translations : [translations];
  //console.log('Translation:');

  translations.forEach((translation, i) => {
    //console.log(`${text} => (${target}) ${translation} \n`);
    translationString += translation;
  });

  //console.log(`google translation: ${translationString}`);

  currTagWord = translationString;
}

//------ SERVER!!
//sends today's word in Tagalog translation
app.get("/", (req, res) => {

    console.log('get success/tagalog word: ' + currTagWord);
    res.json({ translation: currTagWord}); 
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });