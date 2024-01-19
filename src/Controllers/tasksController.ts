import { db } from "../db/db";
import { Response,Request } from "express";


const getTasks = async (req:Request, res:Response) => {
  try {
    const tasks = await db.any('SELECT * FROM "Tasks"');
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteTasks = async (req:Request, res:Response) => {
  const taskId = req.params.TaskId;
  if (!taskId) {
    res.status(400).send("Bad request");
    return;
  }
  try {
    await db.none('DELETE FROM "Tasks" WHERE id = $1', [taskId]);
    res.status(200).send("response received");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const getTaskStatus = async (req:Request, res:Response) => {
  const taskStatus = req.params.taskStatus;
  if (!taskStatus) {
    res.status(400).send("Bad request");
    return;
  }
  try {
    const tasks = await db.any('SELECT * FROM "Tasks" WHERE completed = $1', [
      taskStatus,
    ]);
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateTasks = async (req:Request, res:Response) => {
  const TaskId = req.params.TaskId;
  const task = req.body;

  if (!TaskId || !task) {
    res.status(400).send("Bad request");
    return;
  }

  try {
    await db.none(
      'UPDATE "Tasks" SET title = $1, description = $2, completed = $3, created_at = $4 WHERE id = $5',
      [task.title, task.description, task.completed, task.created_at, TaskId]
    );
    res.status(200).send("response received");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};


const sortTasks= async (req:Request, res:Response) => {
    const sortby = req.params.sortby;
  
    if (!sortby) {
      res.status(400).send("Bad request");
      return;
    }
  
    try {
      const tasksSorted = await db.any(`SELECT * FROM "Tasks" ORDER BY $1:raw ASC`,[sortby]);
      res.json(tasksSorted);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error!");
    }
  }

const getTaskCount = async (req:Request,res:Response) => {
    
    try {
        const result= await db.one('SELECT COUNT(*) AS task_count FROM "Tasks"');
        const taskCount = result.task_count; 
        res.send(taskCount);
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error') 
    }

}


const insertTask = async (req:Request, res:Response) => {
    const task = req.body;
  
    if (!task) {
      res.status(400).send("Bad request");
      return;
    }
  
    try {
      console.log(task);
      await db.none(
        'INSERT INTO "Tasks" (title, description, completed,created_at) VALUES ($1, $2, $3 ,$4)',
        [task.title, task.description, task.completed, task.created_at]
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  
    console.log(task);
    res.status(201).send("response received");
  }


const selectTask=  async (req:Request, res:Response) => {
    const TaskId = req.params.TaskId;
  
    if (!TaskId) {
      res.status(400).send("Bad request");
      return;
    }
  
    try {
      const task = await db.one('SELECT * FROM "Tasks" WHERE id = $1', [TaskId]);
      res.json(task);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }


export default {selectTask,updateTasks,deleteTasks,insertTask,getTaskCount,getTasks,getTaskStatus,sortTasks}