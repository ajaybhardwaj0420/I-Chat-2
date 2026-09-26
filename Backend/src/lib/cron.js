import cron, { CronJob } from "cron";
import { error, log } from "node:console";
import http from "node:http";
import https from "node:https";

// this will send a GET request in every 14 minutes to the health end-point

const job = new CronJob("*/14 * * * *", function () {
  const base = process.env.FRONTEND_URL;
  if (!base) return;
  const url = new URL("/health", base).href;
  const client = url.startsWith("http:") ? https : http;

  client
    .get(url, (res) => {
      if (res.statusCode === 200) console.log("GET request sent successfully");
      else console.log("GET request failed ", res.statusCode);
    })
    .on("error", (e) => console.error("error while sending request", e));
});

export default job;
