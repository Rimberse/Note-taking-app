const fs = require('fs');
const http = require('http');

const server = http.createServer((request, response) => {
    console.dir(request.param);

    if (request.method == 'POST') {
        console.log('POST');

        var body = '';
        request.on('data', data => {
            body += data;
            console.log('Partial body: ' + body);
        });

        request.on('end', () => {
            fs.writeFile('../json/notes.json', body, 'utf8', (err, response) => {
                if (err)
                    console.log(err);
                else
                    console.log(response);
            });

            const content = JSON.parse(body);
            // Gets the last element in an array, this returns the new note, since we store an array of notes in it's entirety
            console.log('Body: ' + content[content.length - 1]);

            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(content[content.length - 1]));
        });
    } else {
        console.log('GET');

        fs.readFile('../json/notes.json', (err, json) => {
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(json);
        });
    }
});

const port = 3000;
const host = 'localhost';
server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);