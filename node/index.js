
const { log } = require('console');
const http = require('http');

const mensagem = 'olá backend em node.js';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(mensagem);
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`servidor rodando em https://localhost:${PORT}`);
});