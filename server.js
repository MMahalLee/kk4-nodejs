const http = require('http');

const todos = [
    { id: 1, text: 'player one' },
    { id: 2, text: 'player two' },
    { id: 3, text: 'player three' },
];

const server = http.createServer((req, res) => {

    const { method, url } = req;
    let body = [];

    req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        let status = 404;
        const response = {
            success: false,
            results: [],
            error: ''
        };
        if (method === 'GET' && url === '/todos') {
            status = 200;
            response.success = true;
            response.results = todos;
        } else if (method === 'POST' && url === '/todos') {
            const { id, text } = JSON.parse(body);

            if (!id || !text) {
                status = 400;
                response.error = 'Mohon Masukkan Id dan Text';
            } else {
                todos.push({ id, text });
                status = 201;
                response.success = true;
                response.results = todos;
            }
        }

        res.writeHead(status, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Node.js'
        });

        res.end(JSON.stringify(response));

    });

    // const data = JSON.stringify({
    //     success: true,
    //     error: 'Not Found',
    //     data: null,
    // });

    // res.end(data);
});

const PORT = 5000;

server.listen(PORT, () => console.log('Anda Berada Pada Port ' + PORT));