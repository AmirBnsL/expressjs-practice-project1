import Express from "express";

const router = Express.Router();
export default router;
import { db } from "../db/db";

import jwt from 'jsonwebtoken';
import 'dotenv'

import tasksController from "../Controllers/tasksController";

router.post("/",tasksController.updateTasks );

router.get("/",tasksController.getTasks );

router.get("/:TaskId",tasksController.selectTask);

router.put("/:TaskId",tasksController.updateTasks );

router.delete("/:TaskId",tasksController.deleteTasks );

router.get("/tasks?Status=:taskStatus",tasksController.getTaskStatus );

router.get("/tasks?sortby=:sortby",tasksController.sortTasks);


/* router.get("/count",tasksController.count)
 */
