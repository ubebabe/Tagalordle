// import { translation } from './translation.js'

'use strict'; // for text to speech

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

//translate from english to tagalog
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

//create audio file from tagalog word
async function textToSpeech() {

  const textToSpeech = require('@google-cloud/text-to-speech');
    const fs = require('fs');
    const util = require('util');
  
    const client = new textToSpeech.TextToSpeechClient();
  
    const text = 'putang ina mo';
  
    const request = {
      input: {text: text},
      voice: {languageCode: 'fil-PH', ssmlGender: 'FEMALE'},
      audioConfig: {audioEncoding: 'MP3'},
    };
  
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
}

//------ SERVER
//sends today's word in Tagalog translation
app.get("/", (req, res) => {

  currEngWord = req.query.englishWord;
  console.log('ENG word: ' + currEngWord);

  textToSpeech();

  translateText().then((data) => {
    console.log('TAGALOG word: ' + currTagWord);
    res.json({ translation: currTagWord}); ; // prints 60 after 4 seconds.
  });;
 
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });