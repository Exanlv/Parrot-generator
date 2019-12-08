# Parrot generator
Easy to use generator to create party parrots using custom images

# Usage
```
const image = 'https://www.iamexpat.nl/sites/default/files/styles/article--full/public/flag-netherlands.jpg?itok=37PGr3ck'; // Local file path & jimp image also work
const speed = 3 // Defaults to 4, lower is faster
const parrot = await createParrot(img, speed);
parrot.save('my-cool-parrot.gif');
```

Resulting image:
![alt text](http://landviz.nl/host/nlparrot.gif "NL flag parrot")

`createParrot` returns a ParrotGif object, `ParrotGif.gif` is a `gifwrap` gif object. More info: https://www.npmjs.com/package/gifwrap

To get the buffer of the parrot, use `ParrotGif.gif.buffer`.