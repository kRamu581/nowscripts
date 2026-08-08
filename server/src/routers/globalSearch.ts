import express from "express";
import { searchAll } from "../controllers/globalSearch.controller";

const router = express.Router();

router.get("/", searchAll);

export default router;
