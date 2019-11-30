const express = require("express");

const db = require("../db/db");
const bodyParser = require("body-parser");

//Setup express
const app = express()

//parse incoming req data

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get(`/api/hello`, (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Hello There'
    })
})

app.get(`/api/todos`, (req, res) => {
    res.status(200).send({
        success: true,
        message: 'todos has been loaded',
        todos: db
    })
})

app.get(`/api/todos/:id`, (req, res) => {
    const id = parseInt(req.params.id)
    db.map((todo) => {
        if (todo.id == id) {
            res.status(200).send({
                success: true,
                message: 'todos has been loaded',
                todos: todo
            })
        }
    })
})

// app.delete(`/api/todos/:id`, (req, res) => {
//     const id = parseInt(req.params.id)
//     db.map((todo, index) => {
//         if (todo.id == id) {
//             db.splice()
//             res.status(200).send({
//                 success: true,
//                 message: 'todos has been loaded',
//                 todos: todo
//             })
//         }
//     })
// })

app.post(`/api/todos`, (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            success: false,
            message: "tolong isi Title"
        })
    } else if (!req.body.description) {
        return res.status(400).send({
            success: false,
            message: "tolong isi Description"
        })
    }
    const todos = {
        id: db[db.length - 1].id + 1,
        title: req.body.title,
        description: req.body.description
    }

    db.push(todos)

    return res.status(201).send({
        success: true,
        message: 'todo added successfully.',
        data: todos
    })
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})