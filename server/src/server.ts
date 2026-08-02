import { config } from "dotenv";
config();
import { server } from "./app";
import mongoose from "mongoose";
import env from "./utils/envalid";
import cron from "node-cron";
import { syncNewsletterArticles } from "./utils/newsletterSync";

import { MongoMemoryServer } from 'mongodb-memory-server';

(async () => {
  try {
    let uri = env.MONGO_URI;
    if (uri.includes('localhost') || uri.includes('127.0.0.1')) {
      console.log('Starting MongoMemoryServer...');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log('MongoMemoryServer started at', uri);
    }

    await mongoose.connect(uri, {
      maxPoolSize: 100,
      minPoolSize: 10,
      retryWrites: true,
    });

    server.listen(env.PORT);
    console.log("Server runninng at PORT :", env.PORT);

    // Initial sync on startup
    await syncNewsletterArticles();

    // Schedule sync every 6 hours
    cron.schedule("0 */6 * * *", () => {
      console.log("Running scheduled newsletter sync...");
      syncNewsletterArticles();
    });
  } catch (err) {
    console.log(err);
  }
})();
