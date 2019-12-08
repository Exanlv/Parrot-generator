const GIFEncoder = require('gifencoder');
const encoder = new GIFEncoder(128, 91);
const pngFileStream = require('png-file-stream');
const fs = require('fs');
 
const stream = pngFileStream('./?.png')
  .pipe(encoder.createWriteStream({ repeat: -1, delay: 500, quality: 10 }))
  .pipe(fs.createWriteStream('myanimated.gif'));
 
stream.on('finish', function () {
  // Process generated GIF
});