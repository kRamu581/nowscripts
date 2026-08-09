import express from "express";
import { getPublicSettings, toggleLoginSettings } from "../controllers/settings.controller";

const router = express.Router();

router.get("/public", getPublicSettings);
router.post("/toggle-login", toggleLoginSettings);

export default router;
