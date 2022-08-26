import expressjwt, { UnauthorizedError } from "express-jwt";
import { expressJwtSecret } from "jwks-rsa";

export interface Options {
  audience: string;
  issuer: string;
  jwksUri: string;
}

/**
 * Authorization middleware that verifies access tokens against a JSON Web Key Set.
 */
export const verifyJwt = ({ audience, issuer, jwksUri }: Options) =>
  expressjwt({
    secret: expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri,
    }),
    audience,
    issuer,
    algorithms: ["RS256"],
  });

const isUnauthorizedError = (error: any): error is UnauthorizedError =>
  error.name === "UnauthorizedError";

/**
 * Catch UnauthorizedErrors and send a response
 */
export const handleUnauthorizedErrors = (
  error: any,
  req: any,
  res: any,
  next: any
) => {
  if (isUnauthorizedError(error)) {
    // console.error("detected credentials_required");
    res.status(error.status).json({
      name: error.name,
      message: error.message,
    });
  } else {
    next(error);
  }
};
