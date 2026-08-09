import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import SystemSettings from "../models/systemSettings";

export const getPublicSettings = asyncHandler(async (req: Request, res: Response) => {
  let settings = await SystemSettings.findOne();
  if (!settings) {
    settings = await SystemSettings.create({ login_enabled: true });
  }
  res.json({
    login_enabled: settings.login_enabled
  });
});

export const toggleLoginSettings = asyncHandler(async (req: Request, res: Response) => {
  let settings = await SystemSettings.findOne();
  if (!settings) {
    settings = await SystemSettings.create({ login_enabled: false });
  } else {
    settings.login_enabled = !settings.login_enabled;
    await settings.save();
  }
  res.json({
    message: "Login settings toggled successfully",
    login_enabled: settings.login_enabled
  });
});
