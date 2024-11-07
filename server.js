const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h2>welcome to server</h2>`);
});

app.listen(8080, function () {
    console.log('listening on 8080');
}); 