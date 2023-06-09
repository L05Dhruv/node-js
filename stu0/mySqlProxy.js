//
// File: MySqlProxy.js
// Auth: Martin Burolla
// Date: 5/2/2023
// Desc: Thin wrapper around the MySQL database and promise pool.
//

const promisePool = require('./PromisePool.js').promisePool

const SELECT_PERSONS = "select * from person"
const SELECT_PERSON  = "select * from person where person_id = ?"
const INSERT_PERSON  = "insert into person (first_name, last_name) values (?, ?)"
const UPDATE_PERSON  = "update person set first_name = ?, last_name = ? where person_id = ?"
const DELETE_PERSON  = "delete from person where person_id = ?"
//
const SELECT_CAR = "select * from car where car_id = ?"
const SELECT_CAR_BY_MAKE = "select * from car where make = ?"
const UPDATE_CAR = "update car set make = ?, model = ?, color = ?, price = ? where car_id = ?"
const INSERT_CAR = "insert into car (make, model, color, price) values (?, ?, ?, ?)"
const DELETE_CAR = "delete from car where car_id = ?"

//
// Person
//

exports.selectPersonById = async (personId) => {
    try {
        const [rows] = await promisePool.query(SELECT_PERSON, [personId])
        // const [rows] = await promisePool.query('SELECT * FROM person WHERE person_id = $1', [personId])
        return rows[0]
    }
    catch (e) {
        console.log(e)
    }
}

exports.selectPersons = async () => {
    try {
        const [rows] = await promisePool.query(SELECT_PERSONS)
        return rows
    }
    catch (e) {
        console.log(e)
    }
}

exports.insertPerson = async (person) => {
    try {
        const [rows] = await promisePool.execute(INSERT_PERSON, 
            [person.firstName, person.lastName])
        return { personId: rows.insertId, ...person } 
    }
    catch (e) {
        console.log(e)
    }
}

exports.updatePerson = async (person) => {
    try {
        const [rows] = await promisePool.execute(UPDATE_PERSON, 
            [person.firstName, person.lastName, person.personId])
        return rows.info
    }
    catch (e) {
        console.log(e)
    }
}

exports.deletePerson = async (personId) => {
    try {
        const [rows] = await promisePool.execute(DELETE_PERSON, [personId])
        return rows
    }
    catch (e) {
        console.log(e)
    }
}

//
// Cars
//

exports.selectCarById = async (carId) => {
    try {
        const [rows] = await promisePool.query(SELECT_CAR, [carId])
        return rows[0]
    }
    catch (e) {
        console.log(e)
    }
}

exports.selectCarByMake = async (make) => {
    try {
        const [rows] = await promisePool.query(SELECT_CAR_BY_MAKE, [make])
        return rows
    }
    catch (e) {
        console.log(e)
    }
}

exports.updateCar = async (car) => {
    try {
        const [rows] = await promisePool.execute(UPDATE_CAR,
            [car.make, car.model, car.color, car.price, car.carId])
        return rows.info
    }
    catch (e) {
        console.log(e)
    }
}

exports.insertCar = async (car) => {
    try {
        const [rows] = await promisePool.execute(INSERT_CAR, 
            [car.make, car.model, car.color, car.price])
        return { carId: rows.insertId, ...car } 
    }
    catch (e) {
        console.log(e)
    }
}

exports.deleteCar = async (carId) => {
    try {
        const [rows] = await promisePool.execute(DELETE_CAR, [carId])
        return rows
    }
    catch (e) {
        console.log(e)
    }
}
