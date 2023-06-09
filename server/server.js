const cors = require('cors')
const express = require('express')
const { body, check, param, validationResult } = require('express-validator');
const {pool} = require('./PromisePool.js');
const path = require('path');

const PORT = 8080;
const app = express();
const corsOptions = { origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }

// Middleware...
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// browsers on load, make a GET request to '/'
app.get('/', cors(corsOptions), (req, res) => {
    
    // sendFile needs an absolute path & can send only ONE file
    const ABSOLUTE_PATH = path.join(__dirname, '../client/index.html');
    res.sendFile(ABSOLUTE_PATH); // ------------------------> ends middleware function
    // res.sendFile(path.join(__dirname, '../client/index.css'));
})


// express.static() needs and absolute path to a directory & can send many static files
app.use(express.static(path.join(__dirname, '../client')));







// app.get('/', cors(corsOptions), async (req, res) => {
//     // sendFile() needs an Absolute path
//     res.sendFile('../client/index.html') // <--- relative path
    
//     const indexHTMLPath = path.join(__dirname, '../client/index.html');
//     res.sendFile(indexHTMLPath);
// });

// app.use(express.static(path.join(__dirname, '../client'))); // <-- creates an absolute path and serves the folder


// app.use(express.static(path.join(__dirname, '../client')));

// Your endpoints here..
app.get('/person', cors(corsOptions), async (req, res) => { 
    //const id = req.params['id']                  // Read parameters from URL.
    // const personType = req.query['personType']   // Read query parameters from URL.
    const result = await pool.query(`SELECT * FROM person`);
    console.log(result)
    const body = result[0]                        // Read request body.
    res.send(body);
})

app.get('/cars', cors(corsOptions), async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM cars');
    const body = rows[0];
    res.send(body);
});

// app.get('/cars/:id/:make', cors(corsOptions), async (err, req, res, next) => {
//     const { id, make } = req.params;

//     const [rows] = await pool.query('SELECT * FROM cars WHERE car_id = ? AND make = ?', [id, make], (error, results) => {
//         // callback function passed to query
//         if (error){
//             //Handle Error
//         } else {
//             // extract data and send to client
//             const body = rows[0];
//             res.send(body);
//         }
//     });

//     // named variables and returns a promise
//     const [result] = pool.execute('SELECT * FROM cars WHERE car_id = :car_id AND make = car_make ', {car_id: id, car_make: make})
//     .then(
//             (result) => res.send(result[0])
//         )

//     if (err) //Handle Error

//     // Goes to next middleware function
//     return next();
// });


// server - routes to appropriate controller
// |   carsController - app.get(/cars/:id)
// |   userController
// |   authController
// |   stripeController




app.get('/cars/?make={make}', cors(corsOptions), async (req, res) => {
    const { make } = req.query;
    const [rows] = await pool.query('SELECT * FROM cars WHERE car_make = $1', make);
    const body = rows[0];
    res.send(body);
})

app.post('/cars', cors(corsOptions), async (req, res) => {
    const { make, model, color, price } = req.body;
    const [rows] = await pool.query('INSERT INTO cars (make, model, price, color) VALUES (?, ?, ?, ?)', [make, model, price, color]);
    console.log(rows);
    rows ? res.status(200).send({message: 'New car inserted'}) : res.status(400).send({message: "unable to create new data"});
})

app.put('/cars', cors(corsOptions), async (req, res) => {
    const { carId, make, model, price, color } = req.body;
    const [rows] = await pool.query(
        `UPDATE cars
        SET make = ?, model = ?, price = ?, color = ?
        WHERE car_id = ?;`,
        [make, model, price, color, carId]
    );
    console.log(rows);
    rows ? res.status(200).send(rows) : res.status(404).send({message: 'car id not valid'})
})

app.listen(PORT, () => {
    console.log(`Express web API running on port: ${PORT}.`)
})
