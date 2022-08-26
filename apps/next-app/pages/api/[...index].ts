import { middleware } from "@my-org/express-api/middleware";
import { Router } from "express";
import { NextApiHandler } from "next";

const router = Router({});
router.use(
  "/api",
  middleware({
    auth0ManagementClient: {
      domain: process.env.AUTH0_MANAGEMENT_DOMAIN || "",
      clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
      clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    },
    jwt: {
      jwksUri: process.env.JWKS_URI,
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
    },
    stripeClient: {
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
  })
);

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
