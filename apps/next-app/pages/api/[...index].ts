import { middleware } from "@my-org/express-api/middleware";
import { Router } from "express";
import { NextApiHandler } from "next";

const router = Router({});
router.use("/api", middleware({}));

/**
 * A Next.js request handler that forwards requests to an Express router
 */
export const forwardToRouter: NextApiHandler = (req, res) =>
  new Promise((resolve, reject) => {
    // Resolve when response was sent
    res.on("finish", resolve);
    // Invoke router request handling
    router(req as any, res as any, (error?: any) => {
      if (error) {
        // Unhandled error, report 500
        console.error(error);
        reject(error);
      } else {
        // Request passed through router, no handler responded, report 404
        res.status(404).send(`Not Found`);
      }
    });
  });

export default forwardToRouter;
