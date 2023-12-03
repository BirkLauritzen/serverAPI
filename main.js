const express = require("express");
const { Pool } = require('pg');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '12345678',
    port: 5432,
});

// Fetch all users
app.get('/users/', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results.rows);
    });
});

// Fetch user by id
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results.rows);
    });
});


// Fetch all cafes
app.get('/cafes', (req, res) => {
    let query = 'SELECT * FROM cafes';
    const queryParams = [];

    if (req.query.city) {
        query += ' WHERE LOWER(city) = LOWER($1)';
        queryParams.push(req.query.city);
    }

    console.log("Executing query:", query, queryParams);
    pool.query(query, queryParams, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results.rows);
    });
});




// Fetch users favourites
app.get('/users/:userId/favorites', (req, res) => {
    const userId = req.params.userId;

    pool.query(
        'SELECT c.* FROM cafes c JOIN favorites f ON c.id = f.cafe_id WHERE f.user_id = $1',
        [userId],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error occurred while fetching favorites');
                return;
            }
            res.json(results.rows);
        }
    );
});



app.listen(port, () => {
    console.log(`Application is now running on port ${port}`);
});
