"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
require("dotenv");
const tasksController_1 = __importDefault(require("../Controllers/tasksController"));
router.post("/", tasksController_1.default.updateTasks);
router.get("/", tasksController_1.default.getTasks);
router.get("/:TaskId", tasksController_1.default.selectTask);
router.put("/:TaskId", tasksController_1.default.updateTasks);
router.delete("/:TaskId", tasksController_1.default.deleteTasks);
router.get("/tasks?Status=:taskStatus", tasksController_1.default.getTaskStatus);
router.get("/tasks?sortby=:sortby", tasksController_1.default.sortTasks);
/* router.get("/count",tasksController.count)
 */ 
