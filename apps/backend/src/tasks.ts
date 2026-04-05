import { Request, Response, Router } from "express";
import { middleware } from "./middleware";
import { createTaskSchema, updateTaskSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const taskRouter: Router = Router();

// Create task endpoint
taskRouter.post("/create", middleware, async (req: Request, res: Response) => {
  try {
    const parsedTaskData = createTaskSchema.safeParse(req.body);

    if (!parsedTaskData.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsedTaskData.error,
      });
    }

    const userId = Number(req.userId);

    const task = await prismaClient.task.create({
      data: {
        title: parsedTaskData.data.title,
        description: parsedTaskData.data.description,
        status: parsedTaskData.data.status,
        priority: parsedTaskData.data.priority,
        dueDate: parsedTaskData.data.dueDate
          ? new Date(parsedTaskData.data.dueDate)
          : null,
        userId: userId,
      },
    });
    return res.status(201).json({ message: "Task created!", task });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// get all tasks
taskRouter.get("/", middleware, async (req: Request, res: Response) => {
  try {
    const userId = Number(req.userId);
    const tasks = await prismaClient.task.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ tasks });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// UPDATE a Task (/:id)
taskRouter.put(
  "/update/:id",
  middleware,
  async (req: Request, res: Response) => {
    try {
      const userId = Number(req.userId);
      const taskId = Number(req.params.id);

      const parsedUpdateData = updateTaskSchema.safeParse(req.body);
      if (!parsedUpdateData.success) {
        return res
          .status(400)
          .json({ message: "Invalid input", errors: parsedUpdateData.error });
      }

      const existingTask = await prismaClient.task.findFirst({
        where: { id: taskId, userId: userId },
      });

      if (!existingTask) {
        return res
          .status(404)
          .json({ message: "Task not found or unauthorized" });
      }

      const updatedTask = await prismaClient.task.update({
        where: { id: taskId },
        data: {
          ...parsedUpdateData.data,
          dueDate: parsedUpdateData.data.dueDate
            ? new Date(parsedUpdateData.data.dueDate)
            : undefined,
        },
      });

      return res
        .status(200)
        .json({ message: "Task updated", task: updatedTask });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
);

// delete a task by id)
taskRouter.delete(
  "/delete/:id",
  middleware,
  async (req: Request, res: Response) => {
    try {
      const taskId = Number(req.params.id);
      const userId = Number(req.userId);

      const existingTask = await prismaClient.task.findFirst({
        where: { id: taskId, userId: userId },
      });

      if (!existingTask) {
        return res
          .status(404)
          .json({ message: "Task not found or unauthorized" });
      }

      await prismaClient.task.delete({
        where: { id: taskId },
      });

      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
);

export default taskRouter;
