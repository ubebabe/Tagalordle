// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = 'your mom';
const target = 'fil';

async function translateText() {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.

  //holds Tagalog vocab
  let [translations] = await translate.translate(text, target);
  let translationString = '';

  translations = Array.isArray(translations) ? translations : [translations];
  console.log('Translation:');

  translations.forEach((translation, i) => {
    console.log(`${text} => (${target}) ${translation} \n`);
    translationString += translation;
  });

  console.log(`${translationString}`);

  return translationString;

}

translateText();

exports.translateText = translateText;