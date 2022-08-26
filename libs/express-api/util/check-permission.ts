import jwtAuthz from "express-jwt-authz";

export const checkPermission = (permission: string): any =>
  jwtAuthz([permission], {
    failWithError: true,
  });

/**
 * Catch UnauthorizedErrors and send a response
 * @see https://github.com/auth0/express-jwt-authz/blob/master/lib/index.js
 */
export const handleForbiddenErrors = (
  error: any,
  req: any,
  res: any,
  next: any
) => {
  if (error.statusCode === 403) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  } else {
    next(error);
  }
};
