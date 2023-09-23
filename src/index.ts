import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// Conneting the mongoose

mongoose.connect(process.env.MONGO_URL!);

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Task = mongoose.model("Task", taskSchema);

app.get("/", async (req, res) => {
  try {
    const taskId = req.body.id;
    const task = await Task.findById({ _id: taskId });
    if (task) {
      res.json({ task });
    } else {
      res.json({ error: "Not able to find the task in the database." });
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

app.post("/", async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = new Task({
      title: taskData.title,
      description: taskData.description,
    });

    const taskCreated = await newTask.save();
    if (taskCreated) {
      res.json({
        message: "Successfully created the task with this id:",
        taskCreated,
      });
    } else {
      res.json({ message: "Unable to add the task to the database." });
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

app.listen(port, () => {
  console.log(`The app is running on ${port}.`);
});
