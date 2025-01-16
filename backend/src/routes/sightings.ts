import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const sightings = await prisma.sighting.findMany();
  res.json(sightings);
});

router.post("/", async (req, res) => {
  const { species, description, latitude, longitude } = req.body;
  const newSighting = await prisma.sighting.create({
    data: { species, description, latitude, longitude },
  });
  res.status(201).json(newSighting);
});

export default router;
