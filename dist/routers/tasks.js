"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const db_1 = require("../db/db");
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = req.body;
    if (!task) {
        res.status(400).send("Bad request");
        return;
    }
    try {
        console.log(task);
        yield db_1.db.none('INSERT INTO "Tasks" (title, description, completed,created_at) VALUES ($1, $2, $3 ,$4)', [task.title, task.description, task.completed, task.created_at]);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    console.log(task);
    res.status(201).send("response received");
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield db_1.db.any('SELECT * FROM "Tasks"');
        res.json(tasks);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}));
router.get("/:TaskId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TaskId = req.params.TaskId;
    if (!TaskId) {
        res.status(400).send("Bad request");
        return;
    }
    try {
        const task = yield db_1.db.one('SELECT * FROM "Tasks" WHERE id = $1', [TaskId]);
        res.json(task);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}));
router.put("/:TaskId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TaskId = req.params.TaskId;
    const task = req.body;
    if (!TaskId || !task) {
        res.status(400).send("Bad request");
        return;
    }
    try {
        yield db_1.db.none('UPDATE "Tasks" SET title = $1, description = $2, completed = $3, created_at = $4 WHERE id = $5', [task.title, task.description, task.completed, task.created_at, TaskId]);
        res.status(200).send("response received");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}));
router.delete("/:TaskId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.TaskId;
    if (!taskId) {
        res.status(400).send("Bad request");
        return;
    }
    try {
        yield db_1.db.none('DELETE FROM "Tasks" WHERE id = $1', [taskId]);
        res.status(200).send("response received");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}));
router.get("/tasks?Status=:taskStatus", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskStatus = req.params.taskStatus;
    if (!taskStatus) {
        res.status(400).send("Bad request");
        return;
    }
    try {
        const tasks = yield db_1.db.any('SELECT * FROM "Tasks" WHERE completed = $1', [
            taskStatus,
        ]);
        res.json(tasks);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}));
router.get("/tasks?sortby=:sortby", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortby = req.params.sortby;
    if (!sortby) {
        res.status(400).send("Bad request");
        return;
    }
    try {
        const tasksSorted = yield db_1.db.any(`SELECT * FROM "Tasks" ORDER BY $1:raw ASC`, [sortby]);
        res.json(tasksSorted);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error!");
    }
}));
router.get("/count", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.one('SELECT COUNT(*) AS task_count FROM "Tasks"');
        const taskCount = result.task_count;
        res.send(taskCount);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}));
