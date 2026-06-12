import express from 'express'
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/taskController.js';

const route = express.Router();

route.get("/", getAllTasks);
route.post("/", createTask);
route.put("/:id", updateTask);
route.delete("/:id", deleteTask);

export default route;