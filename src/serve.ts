import app from ".";
const port = process.env.PORT || 3000;

// start app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
