import { RequestHandler } from "express";

/**
 * Checks if the access token authorizes operations on the referenced user resource.
 */
export const checkIsUser =
  (userIdParam: string): RequestHandler<any, any, any> =>
  (req, res, next) => {
    const userIdInParam = req.params[userIdParam];
    const userIdInToken = (req as any).user.sub as string;

    // Only allow access to user that is encoded in the jwt token
    if (userIdInParam === userIdInToken) {
      next();
    } else {
      const error = `Unauthorized access to user resource ${userIdInParam}.`;
      console.error(error);
      res.status(401).send(error);
    }
  };
