import { read, MIME_PNG } from 'jimp';
import * as Jimp from 'jimp';
import { resizing } from './img-sizing/resizing';
import { readFileSync, writeFileSync } from 'fs';
import { GifFrame, GifUtil, GifCodec, Gif } from 'gifwrap';

const cutoutData: Array<Array<{['x']: number, ['y']: number}>> = JSON.parse(String(readFileSync(`${__dirname}/data.json`)));

export async function createParrot(source, speed = 4): Promise<ParrotGif> {
    const image = await read(source);

    const frames = [];
    for (let i in resizing.frames) {
        let resizedBg = await (image.clone()).resize(resizing.frames[i].w, resizing.frames[i].h);
        
        let frame = new Jimp(resizing.output.w, resizing.output.h);

        await frame.blit(resizedBg, resizing.frames[i].o, resizing.output.h - resizing.frames[i].h);

        for (let j in cutoutData[i]) {
            frame.setPixelColor(0, cutoutData[i][j].x, cutoutData[i][j].y);
        }
        
        await frame.composite(await read(`${__dirname}/parrot-templates/${resizing.frames[i].f}`), 0, 0);

        frames.push(new GifFrame(1, 1, 0, { delayCentisecs: speed }));
        frames[frames.length - 1].bitmap = frame.bitmap;
    }

    GifUtil.quantizeSorokin(frames, 256);

    const codec = new GifCodec();

    return new ParrotGif(await codec.encodeGif(frames, {}));
}

export class ParrotGif {
    public gif: Gif;

    constructor(gif: Gif) {
        this.gif = gif;
    }

    public async save(path: string) {
        writeFileSync(path, this.gif.buffer);
    }
}

createParrot('https://cdn.discordapp.com/attachments/530540966097059840/650035739018526833/JPEG_20191123_173717.jpg', 3).then((parrotGif) => {
    parrotGif.save('whatever.gif');
});