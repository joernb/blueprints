import app from ".";
const port = process.env.PORT;

// start app
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
