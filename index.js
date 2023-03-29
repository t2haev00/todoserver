"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Description: This is the main entry point for the server
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
// Create a new express application instance
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// The port the express app will listen on
const port = 3001;
/*
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({result: 'csuccess'})
})
*/
// Get all tasks
app.get('/', (req, res) => {
    const pool = openDb();
    pool.query('select * from task', (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json(result.rows);
    });
});
// Open a connection to the database
const openDb = () => {
    const pool = new pg_1.Pool({
        /*     user: 'postgres',
             host: 'localhost',
             database: 'todo',
             password: 'Mickey37#',
             port: 5432
             */
        user: 'root',
        host: 'dpg-cgi6q54eoogvqrk0ab9g-a.oregon-postgres.render.com',
        database: 'todo_aywc',
        password: '0Uq0WOlXu0JkndFzYJbfTEihZRkNN10D',
        port: 5432,
        ssl: true
    });
    // Return the connection pool
    return pool;
};
// Post a new task
app.post('/new', (req, res) => {
    const pool = openDb();
    pool.query('insert into task (description) values ($1) returning *', [req.body.description], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
});
//  Delete a task
app.delete('/delete/:id', (req, res) => {
    const pool = openDb();
    const id = parseInt(req.params.id);
    pool.query('delete from task where id = $1', [id], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: id });
    });
});
// Listen on the port
app.listen(port);
