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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Conneting the mongoose
mongoose_1.default.connect(process.env.MONGO_URL);
const taskSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
});
const Task = mongoose_1.default.model("Task", taskSchema);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.body.id;
        const task = yield Task.findById({ _id: taskId });
        if (task) {
            res.json({ task });
        }
        else {
            res.json({ error: "Not able to find the task in the database." });
        }
    }
    catch (error) {
        console.error("Error:", error);
    }
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskData = req.body;
        const newTask = new Task({
            title: taskData.title,
            description: taskData.description,
        });
        const taskCreated = yield newTask.save();
        if (taskCreated) {
            res.json({
                message: "Successfully created the task with this id:",
                taskCreated,
            });
        }
        else {
            res.json({ message: "Unable to add the task to the database." });
        }
    }
    catch (error) {
        console.error("Error:", error);
    }
}));
app.listen(port, () => {
    console.log(`The app is running on ${port}.`);
});
