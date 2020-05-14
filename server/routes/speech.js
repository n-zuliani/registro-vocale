var express = require('express');
var router = express.Router();
var path = require('path');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: path.join(__dirname, 'uploads') });

/* GET users listing. */
router.post('/', multipartMiddleware, function (req, res, next) {
    main(res, req.files.uploads.path).catch(console.error);
});

async function main(res, filepath) {
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');
    const fs = require('fs');

    // Creates a client
    const client = new speech.SpeechClient();

    // The name of the audio file to transcribe
    const fileName = filepath;

    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
        content: audioBytes,
    };
    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 48000,
        languageCode: 'it-IT',
        audioChannelCount: 2
    };
    const request = {
        audio: audio,
        config: config,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    res.send({ text: transcription });
}

module.exports = router;
