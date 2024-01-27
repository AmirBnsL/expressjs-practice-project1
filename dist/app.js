"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = __importDefault(require("./routers/tasks"));
const login_1 = __importDefault(require("./routers/login"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/tasks', tasks_1.default);
app.use('/login', login_1.default);
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
app.get('/', (req, res, next) => {
    console.log('GET request');
    res.send('GET request');
    next();
});
app.get('/', (req, res) => {
    console.log('this bubbled back here');
    res.status(200);
});
app.post('/tasks', (req, res) => {
});
