/**
 * Catch errors and send a response
 */
export const handleErrors = (error: any, req: any, res: any, next: any) => {
  if (error) {
    // Unhandled error, report 500
    console.error(error);
    res.status(500).send(error.toString());
  }
};
