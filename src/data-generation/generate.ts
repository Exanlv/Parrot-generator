import { read, intToRGBA } from 'jimp';
import { writeFileSync } from 'fs';

const images = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png'
];

const outputData = [

];

(async () => {
    for (let i in images) {
        let image = await read(`${__dirname}/${images[i]}`);
        let output = [];
    
        for (let x = 0; x < image.bitmap.width; x++) {
            for (let y = 0; y < image.bitmap.height; y++) {
                if (intToRGBA(image.getPixelColor(x, y)).a === 0) {
                    output.push({x: x, y: y});
                }
            }
        }
    
        outputData.push(output);
    }

    writeFileSync('./data.json', JSON.stringify(outputData));
})();