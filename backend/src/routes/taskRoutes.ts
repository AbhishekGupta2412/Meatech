import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middleware/authMiddleware";
import { z } from "zod";

const router = express.Router();
const prisma = new PrismaClient();

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["pending", "completed"]).optional(),
});

router.use(verifyToken);

router.get("/", async (req: any, res) => {
  const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
  res.json(tasks);
});

router.post("/", async (req: any, res) => {
  try {
    const data = taskSchema.parse(req.body);
    const task = await prisma.task.create({
      data: { ...data, userId: req.user.id },
    });
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ error: "Validation failed" });
  }
});

router.put("/:id", async (req: any, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.updateMany({
      where: { id: Number(id), userId: req.user.id },
      data: req.body,
    });
    res.json(task);
  } catch (e) {
    res.status(400).json({ error: "Update failed" });
  }
});

router.delete("/:id", async (req: any, res) => {
  const { id } = req.params;
  await prisma.task.deleteMany({
    where: { id: Number(id), userId: req.user.id },
  });
  res.json({ message: "Deleted" });
});

export default router;
