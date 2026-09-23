import { Router } from "express";
import * as dbFavorites from "../db/favorites";

const router = Router();

router.get("/", (_req, res) => {
  res.json(dbFavorites.getAll());
});

router.post("/", (req, res) => {
  const zip = typeof req.body?.zip === "string" ? req.body.zip.trim() : "";

  if (!dbFavorites.isValidUsZip(zip)) {
    res.status(400).json({ error: "A valid 5-digit US zip code is required" });
    return;
  }

  const favorite = dbFavorites.create(zip);
  if (!favorite) {
    res.status(400).json({ error: "That zip code is already in favorites" });
    return;
  }

  res.json(favorite);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const favorite = dbFavorites.remove(id);

  if (!favorite) {
    res.status(404).json({ status: "error", error: "Favorite not found" });
    return;
  }

  res.json({ status: "success" });
});

export default router;
