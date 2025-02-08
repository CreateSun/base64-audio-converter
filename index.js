
const fs = require('fs');
const { Readable } = require('stream');

function saveBase64ToMp3Stream(base64String, outputPath) {
    const base64Data = base64String.replace(/^data:audio\/mp3;base64,/, '');
    
    // readable stream
    const audioBuffer = Buffer.from(base64Data, 'base64');
    const readable = new Readable({
        read() {
            this.push(audioBuffer);
            this.push(null);
        }
    });
    
    // writable stream
    const writable = fs.createWriteStream(outputPath);
    
    readable.pipe(writable);
    
    writable.on('finish', () => {
        console.log('File saved successfully');
    });
}

// demo
saveBase64ToMp3Stream('', './output.mp3');