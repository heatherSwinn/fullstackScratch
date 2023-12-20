//responds to requests from the DOM request in index.js

import express from 'express';
import pg from 'pg';
// import cors from 'cors';

const { Pool } = pg;
const app = express ();
const expressPort = 8000;

const pool = new Pool({
    host: 'localhost',
    database: 'groceries',
    user: 'h.swinn',
    server: 5432
})
//middleware
app.use(express.static('public'))
app.use(express.json())
// app.use(cors({
//         "origin": "*",
//         "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//         "preflightContinue": false,
//         "optionsSuccessStatus": 204   
// }));

//retrieve items
app.get('/items', (req, res) => {
    pool.query('SELECT * FROM items')
    .then(result => res.json(result.rows))
    .catch(error => res.status(500).json({ error: error.message}));
});

//add a new item
app.post('/items', (req, res) => {
    const { item_name, quantity, notes } = req.body;

    if(!item_name) {
        return res.status(400).json({ error: 'Item name is required.' });
    }

    pool.query('INSERT INTO items (item_name, quantity, notes) VALUES ($1, $2, $3) RETURNING *', [item_name, quantity, notes])
        .then(result => {
            res.status(201).json(result.rows[0])
            console.log(result.rows[0]);
        })
        .catch(error => res.status(500).json({ error: error.message }));
})

app.listen(expressPort, () => {
    console.log(`listening on port ${expressPort}`)  
})