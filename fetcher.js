// INPUT (COMMAND LINE): > node fetcher.js http://www.example.edu/ ./index.html
// OUTPUT (COMMAND LINE): Example - Downloaded and saved 3261 bytes to ./index.html

const input = process.argv;
const hostUrl = input[2];
const outputFile = input[3];

const fs = require('fs');
const net = require('net');
const url = require('url');

const parsedUrl = url.parse(hostUrl);

const conn = net.createConnection({
  host: parsedUrl.hostname,
  port: 80
});
conn.setEncoding('UTF8');

conn.on('connect', () => {
  conn.write(`GET / HTTP/1.1\r\n`);
  conn.write(`Host: ${parsedUrl.hostname} \r\n`);
  conn.write(`\r\n`);
});

conn.on('data', (data) => {

  const content = data;
  let fileSize = data.length;

  fs.writeFile(outputFile, content, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
    console.log(`Downloaded and saved ${fileSize} bytes to ${outputFile}`);
  });

  conn.end();
});