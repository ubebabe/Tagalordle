// amazing tutorial: https://codelabs.developers.google.com/codelabs/cloud-text-speech-node#0
//set up environmental variable: https://cloud.google.com/docs/authentication/provide-credentials-adc


'use strict';

/**
 * Lists available voices for the specified language.
 *
 * @param {string} languageCode - The language code.
 */
async function listVoices(languageCode) {
  const textToSpeech = require('@google-cloud/text-to-speech');

  const client = new textToSpeech.TextToSpeechClient();

  const [result] = await client.listVoices({languageCode});
  const voices = result.voices;

  voices.forEach((voice) => {
    console.log(`${voice.name} (${voice.ssmlGender}): ${voice.languageCodes}`);
  });
}

listVoices('en');

/**
 * Sythesizes sample text into an .mp3 file.
 */
async function synthesize() {
    const textToSpeech = require('@google-cloud/text-to-speech');
    const fs = require('fs');
    const util = require('util');
  
    const client = new textToSpeech.TextToSpeechClient();
  
    const text = 'This is a demonstration of the Google Cloud Text-to-Speech API';
  
    const request = {
      input: {text: text},
      voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
      audioConfig: {audioEncoding: 'MP3'},
    };
  
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
  }
  
  synthesize();