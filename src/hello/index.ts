import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json((req as any).apiGateway.event);
});

export default router;
